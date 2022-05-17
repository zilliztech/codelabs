const path = require("path");
const fs = require("fs");
const args = require("yargs").argv;
const glob = require("glob");
const { Remarkable } = require("remarkable");
const hljs = require("highlight.js"); // https://highlightjs.org/
const ejs = require("ejs");
const child_process = require("child_process");

// Basic config
const CODELABS_DIR = "./public";
const DEFAULT_CATEGORY = "Default";
const CODELABS_SOURCE_DIR = "./codelabs";
const CODELABS_NAMESPACE = (args.codelabsNamespace || "").replace(
  /^\/|\/$/g,
  ""
);
const TEMPLAT_DIR = "./template.html";
const codelabs = [];
const categories = {};

// get project name via args.env
const project = args.env;

// copy milvus header and footer to components
// new folder path is src/component/commonComponents
if (project === "milvus") {
  const paths = fs
    .readdirSync("./src/commonComponents/milvus")
    .map(path => `./src/commonComponents/milvus/${path}`)
    .filter(v => !v.includes(".DS_Store"));

  paths.forEach(path => {
    child_process.spawn("cp", [
      "-r",
      path,
      "./src/components/commonComponents",
    ]);
  });
}

// insert html to article-template via ejs
const decorateArticle = article => {
  let articleString = article;
  articleString = articleString.split("</h1>")[1];

  const paragraphArr = articleString.split("\n").map(paragrap => {
    if (paragrap.includes("Duration:")) return "";
    return paragrap;
  });
  // console.log("paragraphArr---", paragraphArr);

  const tmp = fs.readFileSync(TEMPLAT_DIR, "utf-8", err => {
    console.log(err);
  });

  const html = ejs.render(tmp, {
    content: paragraphArr.join("\n"),
  });
  return html;
};

// get category
const categoryClass = (codelab, level) => {
  const name = codelab.mainCategory;
  if (level > 0) {
    name += " " + codelab.category[level];
  }
  return name.toLowerCase().replace(/\s/g, "-");
};

// parse codelab meta data
const parseCodelabMetadata = filepath => {
  console.log("m", filepath);

  const meta = JSON.parse(fs.readFileSync(filepath));

  meta.category = meta.category || [];
  if (!Array.isArray(meta.category)) {
    meta.category = [meta.category];
  }

  meta.mainCategory = meta.category[0] || DEFAULT_CATEGORY;
  meta.categoryClass = categoryClass(meta);
  meta.url = path.join(CODELABS_NAMESPACE, meta.id, "index.html");
  meta.articleUrl = path.join(
    CODELABS_DIR,
    CODELABS_NAMESPACE,
    meta.id,
    "article.html"
  );

  return meta;
};

// get all codelab.json from claat generated files
const metaFiles = glob.sync(`${CODELABS_DIR}/*/codelab.json`);
// // load markdown files
// init remarkable
const md = new Remarkable({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ""; // use external default escaping
  },
});

// combine json files
console.log("codelab meta files---", metaFiles);
// loop metaFiles
for (let i = 0; i < metaFiles.length; i++) {
  // get meta data
  const meta = parseCodelabMetadata(metaFiles[i]);
  // compute markdown filename
  const mdFilename = path.join(CODELABS_SOURCE_DIR, meta.source);
  // get markdown file
  const originMD = fs.readFileSync(mdFilename);
  // markdown -> html
  const article = md.render(originMD.toString());
  // save article to disk
  fs.writeFile(meta.articleUrl, decorateArticle(article), err => {
    if (err) {
      throw err;
    }
  });

  // store meta files
  codelabs.push(meta);
  // update categories
  categories[meta.mainCategory] = true;
}

// write json file to src folder
fs.writeFile("./src/codelab.json", JSON.stringify(codelabs), err => {
  if (err) {
    throw err;
  }
});

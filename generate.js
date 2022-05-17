const path = require("path");
const fs = require("fs");
const args = require("yargs").argv;
const glob = require("glob");
const { Remarkable } = require("remarkable");
const hljs = require("highlight.js"); // https://highlightjs.org/

// Basic config
const CODELABS_DIR = "./public";
const DEFAULT_CATEGORY = "Default";
const CODELABS_SOURCE_DIR = "./codelabs";
const CODELABS_NAMESPACE = (args.codelabsNamespace || "").replace(
  /^\/|\/$/g,
  ""
);
const codelabs = [];
const categories = {};

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
  fs.writeFile(meta.articleUrl, article, err => {
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

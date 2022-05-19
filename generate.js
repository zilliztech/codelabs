const path = require("path");
const fs = require("fs");
const args = require("yargs").argv;
const glob = require("glob");

// Basic config
const CODELABS_DIR = "./public";
const DEFAULT_CATEGORY = "Default";
const CODELABS_SOURCE_DIR = "./codelabs";
const MD_PICS_BASE_DIR = "./public/images";
const CODELABS_NAMESPACE = (args.codelabsNamespace || "").replace(
  /^\/|\/$/g,
  ""
);

// get project name via args.env
const project = args.env || "milvus";

// copy milvus header and footer to components
// new folder path is src/component/commonComponents
copyComponents();

generateCodelabsJson();

copyPics();

// copy common component
function copyComponents() {
  const [baseSrcDir, baseTarDir] = [
    "./src/commonComponents",
    "./src/components/commonComponents",
  ];
  const copyFile = (sourcePath, targetPath) => {
    const isDir = fs.statSync(sourcePath).isDirectory();

    if (isDir) {
      const paths = fs
        .readdirSync(sourcePath)
        .map(path => ({
          srcPath: `${sourcePath}/${path}`,
          tarPath: `${targetPath}/${path}`,
        }))
        .filter(v => !v.srcPath.includes(".DS_Store"));

      fs.mkdirSync(targetPath);
      paths.forEach(({ srcPath, tarPath }) => {
        copyFile(srcPath, tarPath);
      });
    } else {
      const file = fs.readFileSync(sourcePath);
      fs.writeFileSync(targetPath, file);
    }
  };

  const paths = fs
    .readdirSync(`${baseSrcDir}/${project}`)
    .map(path => ({
      srcPath: `${baseSrcDir}/${project}/${path}`,
      tarPath: `${baseTarDir}/${path}`,
    }))
    .filter(v => !v.srcPath.includes(".DS_Store"));

  const isExist = fs.existsSync(baseTarDir);
  if (!isExist) {
    fs.mkdirSync(baseTarDir);
  } else {
    fs.rmSync(baseTarDir, {
      recursive: true,
      force: true,
    });
    fs.mkdirSync(baseTarDir);
  }
  paths.forEach(({ srcPath, tarPath }) => {
    copyFile(srcPath, tarPath);
  });
}

function copyPics() {
  const articlePicsPaths = fs.readdirSync(CODELABS_SOURCE_DIR).map(path => ({
    path: `${CODELABS_SOURCE_DIR}/${path}/pic`,
    id: path,
  }));

  articlePicsPaths.forEach(({ path, id }) => {
    const isPicFolderExist = fs.existsSync(path);
    if (isPicFolderExist) {
      fs.readdirSync(path).forEach(picPath => {
        const pic = fs.readFileSync(`${path}/${picPath}`, "binary");

        isnewPicFolderExist = fs.existsSync(`${MD_PICS_BASE_DIR}/${id}`);
        if (!isnewPicFolderExist) {
          fs.mkdirSync(`${MD_PICS_BASE_DIR}/${id}`);
        }
        fs.writeFileSync(
          `${MD_PICS_BASE_DIR}/${id}/${picPath}`,
          pic,
          "binary",
          err => {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    }
  });
}

function generateCodelabsJson() {
  const codelabs = [];
  const categories = {};
  // get all codelab.json from claat generated files
  const metaFiles = glob.sync(`${CODELABS_DIR}/*/codelab.json`);

  // combine json files
  console.log("codelab meta files---", metaFiles);
  // loop metaFiles
  for (let i = 0; i < metaFiles.length; i++) {
    // get meta data
    const meta = parseCodelabMetadata(metaFiles[i]);

    // store meta files
    codelabs.push(meta);
    // update categories
    categories[meta.mainCategory] = true;
  }

  // write json file to src folder
  fs.writeFile("./src/pages/codelab.json", JSON.stringify(codelabs), err => {
    if (err) {
      throw err;
    }
  });
}

// get category
function categoryClass(codelab, level) {
  const name = codelab.mainCategory;
  if (level > 0) {
    name += " " + codelab.category[level];
  }
  return name.toLowerCase().replace(/\s/g, "-");
}

// parse codelab meta data
function parseCodelabMetadata(filepath) {
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
}

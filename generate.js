const path = require('path');
const fs = require('fs');
const args = require("yargs").argv;
const glob = require("glob");
const child_process = require('child_process');
const FILE_PATH = './tutorials';
const CODELABS_DIR = './public';
const DEFAULT_CATEGORY = "Default";
const CODELABS_NAMESPACE = (args.codelabsNamespace || "").replace(
  /^\/|\/$/g,
  ""
);
let codelabs = [];
var categories = {};

const categoryClass = (codelab, level) => {
  var name = codelab.mainCategory;
  if (level > 0) {
    name += " " + codelab.category[level];
  }
  return name.toLowerCase().replace(/\s/g, "-");
};

const parseCodelabMetadata = (filepath) => {
  var meta = JSON.parse(fs.readFileSync(filepath));

  meta.category = meta.category || [];
  if (!Array.isArray(meta.category)) {
    meta.category = [meta.category];
  }

  meta.mainCategory = meta.category[0] || DEFAULT_CATEGORY;
  meta.categoryClass = categoryClass(meta);
  meta.url = path.join(CODELABS_NAMESPACE, meta.id, "index.html");

  return meta;
};

const codelabFiles = glob.sync(`${CODELABS_DIR}/*/codelab.json`);
console.log('codelabFiles---',codelabFiles)
for (let i = 0; i < codelabFiles.length; i++) {
  const codelab = parseCodelabMetadata(codelabFiles[i]);
  codelabs.push(codelab);
  categories[codelab.mainCategory] = true;
}

fs.writeFile('./src/codelab.json', JSON.stringify(codelabs),err=>{
  if(err){
    throw err
  }
})

// const copyAndWriteFile = () =>{
//   const targetPath = './public';

//   const paths = fs.readdirSync(CODELABS_DIR).map(file_path=>{
//     return path.join(CODELABS_DIR,file_path)
//   });
  
//   paths.forEach(file_path=>{
//     const [_,fileName] = file_path.split('/')
//     child_process.spawn('cp', ['-r', file_path, path.join(targetPath,fileName)]);	
//   })
  
// }

// copyAndWriteFile()

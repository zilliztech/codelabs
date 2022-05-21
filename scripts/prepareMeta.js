const glob = require('glob');
const fs = require('fs');
const path = require('path');

exports.prepareMeta = ({ CODELABS_DIR, DEFAULT_CATEGORY }) => {
  const codelabs = [];
  const categories = {};

  // get all codelab.json from claat generated files
  const metaFiles = glob.sync(`${CODELABS_DIR}/*/codelab.json`);

  // combine json files
  console.log('codelab meta files---', metaFiles);
  // loop metaFiles
  for (let i = 0; i < metaFiles.length; i++) {
    // get meta data
    const meta = parseCodelabMetadata(metaFiles[i], DEFAULT_CATEGORY);
    // store meta files
    codelabs.push(meta);
    // update categories
    categories[meta.mainCategory] = true;
  }

  // write json file to src folder
  fs.writeFile(`./src/assets/codelab.json`, JSON.stringify(codelabs), err => {
    if (err) {
      throw err;
    }
  });
};

// parse codelab meta data
function parseCodelabMetadata(filepath, default_category) {
  console.log('m', filepath);

  const meta = JSON.parse(fs.readFileSync(filepath));

  meta.category = meta.category || [];
  if (!Array.isArray(meta.category)) {
    meta.category = [meta.category];
  }

  meta.mainCategory = meta.category[0] || default_category;
  meta.categoryClass = categoryClass(meta);
  meta.url = path.join(meta.id, `index.html`);
  console.log('meta.url', meta.url);
  return meta;
}

// get category
function categoryClass(codelab, level) {
  const name = codelab.mainCategory;
  if (level > 0) {
    name += ' ' + codelab.category[level];
  }
  return name.toLowerCase().replace(/\s/g, '-');
}

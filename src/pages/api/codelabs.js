const glob = require('glob');

// Basic config
const CODELABS_DIR = './public';
const DEFAULT_CATEGORY = 'Default';

export default function handler(req, res) {
  // get all codelab.json from claat generated files
  const codelabs = [];
  const categories = {};
  // get all codelab.json from claat generated files
  const metaFiles = glob.sync(`${CODELABS_DIR}/*/codelab.json`);

  // loop metaFiles
  for (let i = 0; i < metaFiles.length; i++) {
    // get meta data
    const meta = parseCodelabMetadata(metaFiles[i]);

    // store meta files
    codelabs.push(meta);
    // update categories
    categories[meta.mainCategory] = true;
  }
  res.status(200).json(codelabs);
}

// get category
function categoryClass(codelab, level) {
  const name = codelab.mainCategory;
  if (level > 0) {
    name += ' ' + codelab.category[level];
  }
  return name.toLowerCase().replace(/\s/g, '-');
}

// parse codelab meta data
function parseCodelabMetadata(filepath) {
  const fs = require('fs');
  const path = require('path');
  const meta = JSON.parse(fs.readFileSync(filepath));

  meta.category = meta.category || [];
  if (!Array.isArray(meta.category)) {
    meta.category = [meta.category];
  }

  meta.mainCategory = meta.category[0] || DEFAULT_CATEGORY;
  meta.categoryClass = categoryClass(meta);
  meta.url = path.join(meta.id, 'index.html');

  return meta;
}

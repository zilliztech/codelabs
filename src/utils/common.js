const { Remarkable } = require('remarkable');
const hljs = require('highlight.js'); // https://highlightjs.org/
const glob = require('glob');
// Basic config
const CODELABS_DIR = './public';
const DEFAULT_CATEGORY = 'Default';

function get(state, line) {
  const pos = state.bMarks[line];
  const max = state.eMarks[line];
  return state.src.substr(pos, max - pos);
}

export function array2Obj(arr) {
  const res = {};
  arr.forEach(item => {
    const [key, value] = item.split(':');
    res[key] = value.trim();
  });
  return res;
}

export function convertMkdToHtml(originMD) {
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

      return ''; // use external default escaping
    },
  });
  // use plugins
  md.use(md => {
    // parser
    const frontmatter = [];

    md.block.ruler.before(
      'heading', // before code
      'frontmatter', // rule name: meta
      // parser
      function (state, start, end) {
        // only starting from the 0 line
        if (start !== 0) return false;
        for (let line = start + 1; line < end; line++) {
          const str = get(state, line);
          // if the line is a headding line or an empty line
          if (str.startsWith('#') || str === '') {
            // update state line
            state.line = line;
            // update token
            state.tokens.push({
              type: 'frontmatter', // token name, should be the same as in the renderer.rules
              level: state.level,
              lines: [0, line - 1],
            });
            break;
          }
          // if (state.tShift[line] < 0) break;
          frontmatter.push(str);
        }

        md.frontmatter = frontmatter;
        return true;
      },
      { alt: [] }
    );

    // parser
    md.block.ruler.before(
      'heading', // before code
      'frontmatter', // rule name: meta
      // parser
      function (state, start) {
        const str = get(state, start);
        if (!str.startsWith('Duration')) return false;

        // update state line
        state.line = start + 1;
        // update token
        state.tokens.push({
          type: 'duration', // token name, should be the same as in the renderer.rules
          level: state.level,
          lines: [start, start],
        });

        return true;
      },
      { alt: [] }
    );

    // renderer
    // frontmatter, just render empty string
    md.renderer.rules.frontmatter = () => {
      return '';
    };
    // duration, just render empty string·
    md.renderer.rules.duration = () => {
      return '';
    };

    const originalImageRender = md.renderer.rules.image;
    // image
    md.renderer.rules.image = (tokens, idx, options) => {
      const meta = array2Obj(md.frontmatter);
      tokens[idx].src = `./${meta.id}/${tokens[idx].src}`;
      return originalImageRender(tokens, idx, options);
    };
  });

  const article = md.render(originMD.toString());
  return article;
}

export function getCodelabsJson() {
  // get all codelab.json from claat generated files
  const codelabs = [];
  const categories = {};
  // get all codelab.json from claat generated files
  const metaFiles = glob.sync(`${CODELABS_DIR}/*/codelab.json`);
  // loop metaFiles
  for (let i = 0; i < metaFiles.length; i++) {
    // get meta data
    const meta = parseCodelabMetadata(metaFiles[i]);
    console.log(meta)
    // store meta files
    if (meta.status && meta.status.indexOf('published') !== -1) {
      codelabs.push(meta);
    }
    // update categories
    categories[meta.mainCategory] = true;
  }
  return codelabs;
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

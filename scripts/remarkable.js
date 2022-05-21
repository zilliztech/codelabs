const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { Remarkable } = require('remarkable');
const hljs = require('highlight.js'); // https://highlightjs.org/

const CODELABS_SOURCE_DIR = './codelabs';
const ARTICLE_TEMPLATE = './scripts/article-template/milvus.html';
const template = fs.readFileSync(ARTICLE_TEMPLATE, 'utf-8', err => {
  console.log(err);
});

// get all codelab.json from claat generated files
const metaFile = fs.readFileSync(`src/assets/codelab.json`).toString();
const metaObjs = JSON.parse(metaFile);

// combine json files
// console.log('codelab meta files---', metaObjs);
// loop metaFiles
for (let i = 0; i < metaObjs.length; i++) {
  // get meta data
  const meta = metaObjs[i];

  // compute markdown filename
  const mdFilename = path.join(CODELABS_SOURCE_DIR, meta.source);
  // get markdown file
  const originMD = fs.readFileSync(mdFilename);
  // markdown -> html
  const article = convertMkdToHtml(originMD.toString());
  console.info(`Writing article: ${meta.articleUrl}`);
  fs.writeFile(meta.articleUrl, decorateArticle({ article, meta }), err => {
    if (err) {
      throw err;
    }
  });
}

// insert html to article-template via ejs
function decorateArticle({ article, meta }) {
  const html = ejs.render(template, {
    meta,
    content: article,
  });
  return html;
}

function get(state, line) {
  const pos = state.bMarks[line];
  const max = state.eMarks[line];
  return state.src.substr(pos, max - pos);
}

function convertMkdToHtml(originMD) {
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
    md.block.ruler.before(
      'heading', // before code
      'frontmatter', // rule name: meta
      // parser
      function (state, start, end) {
        // only starting from the 0 line
        if (start !== 0) return false;

        const frontmatter = [];

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
    // duration, just render empty string
    md.renderer.rules.duration = () => {
      return '';
    };

    const originImgRul = md.renderer.rules.image;
    // img
    md.renderer.rules.image = function (tokens, idx, options /*, env */) {
      tokens[idx].src = path.join(`img`, path.basename(tokens[idx].src));
      return originImgRul(tokens, idx, originMD);
    };
  });

  const article = md.render(originMD.toString());
  return article;
}

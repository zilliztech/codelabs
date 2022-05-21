const { Remarkable } = require('remarkable');
const hljs = require('highlight.js'); // https://highlightjs.org/

const TEMPLAT_DIR = './template.html';
const CODELABS_SOURCE_DIR = './codelabs';
const template = fs.readFileSync(TEMPLAT_DIR, 'utf-8', err => {
  console.log(err);
});

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
  });

  const article = md.render(originMD.toString());
  return article;
}

// get all codelab.json from claat generated files
const metaFiles = glob.sync(`${CODELABS_DIR}/*/codelab.json`);

// combine json files
console.log('codelab meta files---', metaFiles);
// loop metaFiles
for (let i = 0; i < metaFiles.length; i++) {
  // get meta data
  const meta = parseCodelabMetadata(metaFiles[i]);
  // compute markdown filename
  const mdFilename = path.join(CODELABS_SOURCE_DIR, meta.source);
  // get markdown file
  const originMD = fs.readFileSync(mdFilename);
  // markdown -> html
  const article = convertMkdToHtml(originMD.toString());
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

// insert html to article-template via ejs
function decorateArticle(article) {
  const html = ejs.render(template, {
    content: article,
  });
  return html;
}

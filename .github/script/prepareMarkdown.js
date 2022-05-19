const fs = require('fs');
const glob = require('glob');

const CODELABS_DIR = 'codelabs';
// get all codelab.json from claat generated files
const mdFiles = glob.sync(`${CODELABS_DIR}/*/index.md`);

for (let i = 0; i < mdFiles.length; i++) {
  const mdFile = mdFiles[i];
  const mdFileContents = fs.readFileSync(mdFile, 'utf-8');
  const newFile = mdFile.replace(`index.md`, `pdf.md`);

  const newMarkdownContent = [];
  const frontmatter = [];
  const lines = mdFileContents.split(/\r?\n/);

  let frontmatter_set = false;

  lines.forEach((line, index) => {
    // remove durations and frontmatter
    if (frontmatter_set) {
      if (!line.startsWith('Duration:')) {
        newMarkdownContent.push(line);
      }
    } else {
      frontmatter.push(line);
      const nextLine = lines[index + 1];
      frontmatter_set = nextLine.startsWith('# ') || nextLine === '';
    }

    
  });

  console.log(`new pdf.md saved`, newFile, frontmatter);

  // save article to disk
  fs.writeFile(
    newFile,
    ['---', ...frontmatter, '---', ...newMarkdownContent].join('\n'),
    err => {
      if (err) {
        throw err;
      }
    }
  );
}

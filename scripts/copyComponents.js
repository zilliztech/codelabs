const fs = require('fs');
const ejs = require('ejs');

// copy common component
exports.copyComponents = project => {
  // update page title
  ModifyHtlTitle(project);

  const [baseSrcDir, baseTarDir] = [
    './src/commonComponents',
    './src/components/commonComponents',
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
        .filter(v => !v.srcPath.includes('.DS_Store'));

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
    .filter(v => !v.srcPath.includes('.DS_Store'));

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
};

function ModifyHtlTitle(project = 'milvus') {
  const template = fs.readFileSync('./template.html', 'utf-8');
  const newTitle = project.toString();
  const [firstLetter, otherLetters] = [newTitle[0], newTitle.substring(1)];
  const title = `${firstLetter.toUpperCase()}${otherLetters}`;
  const html = ejs.render(template, { title });
  fs.writeFileSync('./index.html', html);
}

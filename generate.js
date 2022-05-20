const fs = require('fs');
const args = require('yargs').argv;

// get project name via args.env
const project = args.env || 'milvus';

// copy milvus header and footer to components
// new folder path is src/component/commonComponents
copyComponents();

// copy common component
function copyComponents() {
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
}

const fs = require('fs');
const args = require('yargs').argv;

// Basic config
const CODELABS_SOURCE_DIR = './codelabs';
const MD_PICS_BASE_DIR = './public/images';

// get project name via args.env
const project = args.env || 'milvus';

// copy milvus header and footer to components
// new folder path is src/component/commonComponents
copyComponents();

copyPics();

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

function copyPics() {
  const articlePicsPaths = fs.readdirSync(CODELABS_SOURCE_DIR).map(path => ({
    path: `${CODELABS_SOURCE_DIR}/${path}/pic`,
    id: path,
  }));

  articlePicsPaths.forEach(({ path, id }) => {
    const isPicFolderExist = fs.existsSync(path);
    if (isPicFolderExist) {
      fs.readdirSync(path).forEach(picPath => {
        const pic = fs.readFileSync(`${path}/${picPath}`, 'binary');

        isnewPicFolderExist = fs.existsSync(`${MD_PICS_BASE_DIR}/${id}`);
        if (!isnewPicFolderExist) {
          fs.mkdirSync(`${MD_PICS_BASE_DIR}/${id}`);
        }
        fs.writeFileSync(
          `${MD_PICS_BASE_DIR}/${id}/${picPath}`,
          pic,
          'binary',
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

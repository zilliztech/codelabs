const args = require('yargs').argv;
const { copyComponents } = require('./scripts/copyComponents');
const { prepareMeta } = require('./scripts/prepareMeta');

// Basic config
const CODELABS_DIR = './public';
const DEFAULT_CATEGORY = 'Default';

// prepare meta
prepareMeta({ CODELABS_DIR, DEFAULT_CATEGORY });
// copy milvus header and footer to components
// new folder path is src/component/commonComponents
copyComponents(args.env || 'milvus');

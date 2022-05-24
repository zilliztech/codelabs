const args = require('yargs').argv;
const { copyComponents } = require('./scripts/copyComponents');

// get project name via args.env
const project = args.env || 'milvus';

copyComponents(project);

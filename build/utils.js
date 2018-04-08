const path = require('path');
const config = require('../config');

const isProd = process.env.NODE_ENV === 'production';

exports.assetsPath = filePath => {
  const assetsSubDirectory = isProd ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, filePath);
};

/**
 * 转换为绝对路径
 * @param {String} dir
 */
exports.resolve = dir => path.join(__dirname, '../', dir);

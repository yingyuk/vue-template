const path = require('path');

/**
 * 转换为绝对路径
 * @param {String} dir
 */
exports.resolve = dir => path.join(__dirname, '../../', dir);

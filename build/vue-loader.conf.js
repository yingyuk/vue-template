const utils = require('./utils');
const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';
const isServer = process.env.VUE_ENV === 'server';

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction && !isServer, // 生产环境的客户端才提取css
  }),
  preserveWhitespace: false,
};

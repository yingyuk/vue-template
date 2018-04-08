process.env.VUE_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const config = require('../config');
const utils = require('./utils');

module.exports = merge({}, common, {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'create-api': utils.resolve('src/http/devHttp.js'),
    },
  },
  plugins: [
    // 定义变量
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: utils.resolve('dist'),
    // https: true,
    hot: true,
    allowedHosts: [],
    open: true,
    // useLocalIp: true,
    clientLogLevel: 'none', // none, error, warning or info (default).
    openPage: '',
    port: process.env.PORT || undefined,
    proxy: config.dev.proxyTable,
    noInfo: true,
    // lazy: true,
    overlay: true,
    // publicPath: config.dev.assetsPublicPath,
    // quiet: false,
    // watchContentBase: true,
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: '/' }],
    },
  },
});

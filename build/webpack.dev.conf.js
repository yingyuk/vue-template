const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach((name) => {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  resolve: {
    alias: {
      'create-api': path.resolve(__dirname, '../src/api/create-api-dev.js'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      DEBUG: config.dev.debug,
      SERVICE_WORKER: config.dev.serviceWorker,
    }),
    // new webpack.DllReferencePlugin({
    //   context: '.',
    //   manifest: require('../dist/dll/vendor-manifest.json'),
    // }),
    // new webpack.DllReferencePlugin({
    //   context: '.',
    //   manifest: require('../dist/dll/vue-manifest.json'),
    // }),
    // new AddAssetHtmlPlugin({
    //   includeSourcemap: false,
    //   filepath: path.join(config.build.assetsRoot, './dll/vendor.dll.js'),
    //   publicPath: path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory, 'dll'),
    //   outputPath: path.posix.join(config.build.assetsSubDirectory, 'dll'),
    // }),
    // new AddAssetHtmlPlugin({
    //   includeSourcemap: false,
    //   filepath: path.join(config.build.assetsRoot, './dll/vue.dll.js'),
    //   publicPath: path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory, 'dll'),
    //   outputPath: path.posix.join(config.build.assetsSubDirectory, 'dll'),
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
    }),
    new FriendlyErrorsPlugin(),
  ],
});

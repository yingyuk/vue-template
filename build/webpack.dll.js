process.env.NODE_ENV = 'production';

const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('../config');

const { build: { assetsRoot, dllDirectory } } = config;

module.exports = {
  mode: 'production',
  // entry: Object.keys(require('../package.json').dependencies),
  entry: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios', 'vue-lazyload'],
  output: {
    path: path.join(assetsRoot, dllDirectory),
    filename: '[name].dll.js',
    library: '[name]_[hash]', // 全局变量名
  },
  plugins: [
    new CleanWebpackPlugin([dllDirectory], {
      root: assetsRoot,
      verbose: false,
    }),
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(assetsRoot, dllDirectory, 'manifest.json'), // manifest文件的输出路径
    }),
  ],
};

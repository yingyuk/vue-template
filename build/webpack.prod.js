process.env.VUE_ENV = 'production';
process.env.NODE_ENV = 'production';

const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const common = require('./webpack.common.js');

const config = require('../config');
const utils = require('./utils');

const { build: { assetsRoot, dllDirectory, assetsSubDirectory, assetsPublicPath } } = config;

module.exports = merge({}, common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    alias: {
      'create-api': utils.resolve('src/http/prodHttp.js'),
    },
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.join(assetsRoot, dllDirectory, 'manifest.json'),
    }),
    new CleanWebpackPlugin([assetsSubDirectory], {
      root: assetsRoot,
      verbose: false,
    }),
    new webpack.DefinePlugin({
      'process.env': config.build.env,
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [path.join('/', dllDirectory, 'main.dll.js')],
      append: false, // false 在其他资源的之前添加; true 在其他资源之后添加
      publicPath: assetsPublicPath + assetsSubDirectory,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: assetsSubDirectory,
        ignore: ['.*'],
      },
      {
        from: path.resolve(assetsRoot, dllDirectory),
        to: path.join(assetsSubDirectory, dllDirectory),
      },
    ]),
  ],
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
});

process.env.VUE_ENV = 'server';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common');

const VueSSRPlugin = require('vue-ssr-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('../config');
const utils = require('./utils');

const filename = 'vue-ssr-bundle.json';

const webpackConfig = merge({}, common, {
  target: 'node',
  mode: 'production',
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'ssr/[name].[hash].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    alias: {
      'create-api': utils.resolve('src/http/ssrHttp.js'),
    },
  },
  // 所有包从node_modules里读取
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new CleanWebpackPlugin([filename], {
      root: config.build.assetsRoot,
      verbose: false,
    }),
    new webpack.DefinePlugin({
      'process.env': Object.assign({}, config.build.env, { VUE_ENV: '"server"' }),
    }),
    new VueSSRPlugin({
      filename,
    }),
  ],
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
});

module.exports = webpackConfig;

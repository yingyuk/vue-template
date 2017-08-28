const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = {
  entry: {
    vue: [
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync',
    ],
    vendor: [
      'axios',
      'store',
      // 'mint-ui',
      'jquery',
      // 'swiper',
    ],
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'dll/[name].dll.js',
    library: '[name]_lib',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: utils.assetsPath('[name].[hash].css'),
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.DllPlugin({
      name: '[name]_lib',
      path: path.join(__dirname, '../dist/dll', '[name]-manifest.json'),
    }),
  ],
};

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(`\\.(${config.build.productionGzipExtensions.join('|')})$`),
      threshold: 10240,
      minRatio: 0.8,
    }));
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;

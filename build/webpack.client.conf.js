const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');


const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 250 * 1000,
    maxAssetSize: 150 * 1000,
  },
  resolve: {
    alias: {
      'create-api': path.resolve(__dirname, '../src/api/create-api-client.js'),
    },
  },
  // 不打包以下模块
  externals: {
    // vue: 'Vue', // 80k
    // vuex: 'Vuex', // 20k
    // 'vue-router': 'VueRouter', // 24k
    // axios: 'axios',
    'mint-ui': 'Mint',
    // jquery: 'jQuery',
    // swiper: 'Swiper',
  },
  plugins: [
    // 定义变量
    new webpack.DefinePlugin({
      'process.env': config.build.env,
      DEBUG: config.build.debug,
      SERVICE_WORKER: config.build.serviceWorker,
    }),

    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
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


    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      // minChunks: Infinity,
      chunks: ['vendor'],
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*'],
    }]),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10, // Minimum number of characters
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


    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: 'dependency',
    }),
  ],
});

if (config.build.serviceWorker) {
  const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

  webpackConfig.plugins.push(
    new SWPrecacheWebpackPlugin({
      cacheId: 'vue',
      filename: 'service-worker.js',
      // dontCacheBustUrlsMatching: /\.\w{8}\./,
      dontCacheBustUrlsMatching: /./,
      // minify: true,
      // navigateFallback: `${PUBLIC_PATH}index.html`,
      // mergeStaticsConfig: true,
      staticFileGlobsIgnorePatterns: [/\.map$/],
      // staticFileGlobsIgnorePatterns: [/\.map$/],
      // runtimeCaching: [{
      //   urlPattern: '/',
      //   handler: 'networkFirst',
      // }],
    }));

  // ...

  // const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
  // new ServiceWorkerWebpackPlugin({
  //   entry: path.join(__dirname, '../src/sw.js'),
  //   excludes: [
  //     '**/.*',
  //     '**/icons/**/*.png',
  //     '**/*.map',
  //     '**/*.json',
  //     '*.html',
  //   ],
  // }),
}


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

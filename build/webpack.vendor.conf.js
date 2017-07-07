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
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const PUBLIC_PATH = 'http://localhost:3000/';

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
    }),
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    library: '[name]_library',
    // library: 'vendor_lib',
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 250 * 1000,
    maxAssetSize: 100 * 1000,
  },
  resolve: {
    alias: {
      'create-api': path.resolve(__dirname, '../src/config/create-api-client.js'),
    },
  },
  // 不打包以下模块
  externals: {
    // vue: 'Vue', // 80k
    // vuex: 'Vuex', // 20k
    // 'vue-router': 'VueRouter', // 24k
    // axios: 'axios',
    // 'mint-ui': 'Mint',
    // jquery: 'jQuery',
    // swiper: 'Swiper',
  },
  plugins: [
    // 定义变量
    new webpack.DefinePlugin({
      'process.env': config.build.env,
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
    new webpack.DllPlugin({
      context: __dirname,
      name: "[name]_[hash]",
      path: path.join(config.build.assetsRoot, '[name]-manifest.json'),
    }),
    // new webpack.DllReferencePlugin({
    //   context: '.',
    //   // context: config.build.assetsRoot,
    //   // manifest: 
    //   // path: path.join(config.build.assetsRoot, "dll-manifest.json"),
    //    manifest: require('../dist/vendor-manifest.json'),
    //   // manifest: require(path.join(config.build.assetsRoot, "vendor-dll-manifest.json")),
    //   // name: "./my-dll.js",
    //   // scope: "xyz",
    //   // sourceType: "commonsjs2",
    //   // context: __dirname,
    //   // manifest: require(path.resolve(__dirname, '../dist/', 'mainfest.json')),
    //   // name: path.resolve(__dirname, '../dist/', 'my-dll.js'),
    //   // // name: "./my-dll.js",
    //   // scope: "xyz",
    //   // sourceType: "commonsjs2",
    //   // scope: "vendor_lib",
    //   // path: path.resolve(__dirname, '..', '[name]-mainfest.json'),
    //   // path: 'dist/vendor-manifest.json',
    //   // manifest: require("../dll/js/beta-manifest.json"), // eslint-disable-line
    //   // extensions: [".js", ".jsx"]
    // }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
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
    // new SWPrecacheWebpackPlugin({
    //   cacheId: 'my-project-name',
    //   filename: 'service-worker.js',
    //   // dontCacheBustUrlsMatching: /\.\w{8}\./,
    //   dontCacheBustUrlsMatching: /./,
    //   // minify: true,
    //   navigateFallback: `${PUBLIC_PATH}index.html`,
    //   mergeStaticsConfig: true,
    //   staticFileGlobsIgnorePatterns: [/\.map$/],
    //   // runtimeCaching: [{
    //   //   urlPattern: '/',
    //   //   handler: 'networkFirst',
    //   // }],
    // }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      // minChunks: Infinity,
      chunks: ['vendor'],
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*'],
    }]),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10, // Minimum number of characters
    }),
  ],
});

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

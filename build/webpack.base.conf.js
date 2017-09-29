const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueConfig = require('./vue-loader.conf');

const isProd = process.env.NODE_ENV === 'production';
const isServer = process.env.VUE_ENV === 'server';
const ExtractTextPlugin = require('extract-text-webpack-plugin');


function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: ['./src/entry-client.js'], // 入口文件
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // vue$: 'vue/dist/vue.esm.js',
      vue: isProd ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
      src: resolve('src'),
      node_modules: resolve('node_modules'),
    },
  },
  module: {
    rules: [
      /* {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery',
        }, {
          loader: 'expose-loader',
          options: '$',
        }],
      }, */
      /* {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }, */
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig,
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      }, {
        test: /\.css$/,
        use: isProd && !isServer ?
          ExtractTextPlugin.extract({
            use: 'css-loader?minimize',
            fallback: 'vue-style-loader',
          }) : ['vue-style-loader', 'css-loader'],
      }, {
        test: /\.scss$/,
        use: isProd && !isServer ?
          ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
            }, {
              loader: 'sass-loader',
            }],
            fallback: 'style-loader',
          }) : ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

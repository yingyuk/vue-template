const path = require('path');
const os = require('os'); // node 提供的系统操作模块

const HappyPack = require('happypack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('../config');
const utils = require('./utils');

const isProd = process.env.NODE_ENV === 'production';

// 根据我的系统的内核数量 指定线程池个数 也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// 之所以使用 'vue-style-loader', 而不使用 'style-loader' ;
// 是为了 SSR 时, 避免 window is not defined 报错
module.exports = {
  entry: [utils.resolve('src/entry-client.js')],
  output: {
    path: isProd ? config.build.assetsRoot : config.dev.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash].js'),
    // chunkFilename: utils.assetsPath('js/[id].[hash].js'),
    publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
  },
  resolve: {
    modules: [
      // 优化模块查找路径
      path.resolve('node_modules'), // 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
      // 先 resolve node_modules, 再是 src, 避免 import store from 'store'; 指向了 src/store
      path.resolve('src'),
    ],
    alias: {
      // 别名配置 通过别名配置 可以让我们引用变的简单
      vue$: 'vue/dist/vue.common.js', // $表示精确匹配
      // 当你在任何需要导入src下面的文件时可以 import moduleA from 'src/moduleA'
      // src会被替换为resolve('src') 返回的绝对路径 而不需要相对路径形式导入
      src: utils.resolve('src'),
    },
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        exclude: /node_modules/,
        include: utils.resolve('src'),
      },
      {
        test: /\.vue$/,
        use: 'happypack/loader?id=vue',
        exclude: /node_modules/,
        include: utils.resolve('src'),
      },
      {
        test: /\.less$/,
        use: 'happypack/loader?id=less',
      },
      {
        test: /\.scss$/,
        use: 'happypack/loader?id=scss',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
    noParse(content) {
      return /jquery|lodash|es6-promise/.test(content);
    },
  },
  plugins: [
    new HappyPack({
      // 基础参数设置
      id: 'babel', // 上面loader?后面指定的id
      loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader  // 缓存loader执行结果
      threadPool: happyThreadPool,
      verbose: false,
    }),
    new HappyPack({
      id: 'vue',
      loaders: [
        {
          loader: 'vue-loader',
          options: {
            cssModules: {
              localIdentName: '[path][name]---[local]---[hash:base64:5]',
              camelCase: true,
            },
            cacheDirectory: true,
            preserveWhitespace: false,
          },
        },
      ],
      threadPool: happyThreadPool,
      verbose: false,
    }),
    new HappyPack({
      id: 'less',
      loaders: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      threadPool: happyThreadPool,
      verbose: false,
    }),
    new HappyPack({
      id: 'scss',
      loaders: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      threadPool: happyThreadPool,
      verbose: false,
    }),
    new HtmlWebpackPlugin({
      template: utils.resolve('src/index.html'),
      // hash: true, // 防止缓存
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true,
      },
      chunksSortMode: 'dependency',
    }),
  ],
};

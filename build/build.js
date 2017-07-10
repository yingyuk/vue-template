require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
let webpackConfig;

const target = process.env.target;

function remove(_path) {
  return new Promise((resolve, reject) => {
    rm(_path, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

function build(_config, type) {
  const spinner = ora(`building for ${type}...`);
  spinner.start();
  return new Promise(function (resolve, reject) {
    webpack(_config, (err, stats) => {
      spinner.stop();
      if (err) {
        reject(err);
      }
      process.stdout.write(`${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      })}\n\n`);

      console.log(chalk.cyan('  Build complete.\n'));
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ));
    });
  });
}

(async function () {
  try {
    if (target == 'vendor') {
      webpackConfig = require('./webpack.vendor.conf');
      await remove(path.join(config.build.assetsRoot));
    } else if (target == 'server') {
      webpackConfig = require('./webpack.server.conf');
    } else if (target == 'client') {
      webpackConfig = require('./webpack.client.conf');
      await remove(path.join(config.build.assetsRoot, config.build.assetsSubDirectory));
    } else {
      console.info(
        `请输入要打包的类型: \n` +
        `  服务器渲染打包:  npm run build:server\n` +
        `  浏览器渲染打包:  npm run build:client\n` +
        `  服务器 + 浏览器: npm run build\n` +
        `  提取依赖库打包:  npm run build:vendor\n`
      );
      return;
    }
    await build(webpackConfig);
  } catch (err) {
    throw err;
  }
}());

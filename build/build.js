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

if (target == 'vendor') {
  webpackConfig = require('./webpack.vendor.conf');
} else if (target == 'server') {
  webpackConfig = require('./webpack.server.conf');
} else {
  webpackConfig = require('./webpack.client.conf');
}

const spinner = ora('building for production...');
spinner.start();

function remove() {
  return new Promise((resolve, reject) => {
    rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

(async function () {
  if (!target) {
    await remove();
  }
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
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
}());

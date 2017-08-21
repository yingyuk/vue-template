// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/cdn/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    serviceWorker: false,
    debug: false,
    serviceRender: false,
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    debug: true,
    serviceWorker: false,
    proxyTable: {
      api: {
        target: 'http://www.google.com/',
        filter(pathname, req) {
          const isApi = pathname.indexOf('/api') == 0;
          const ret = isApi;
          return ret;
        },
        // pathRewrite(path, req) {
        //   return path.replace('/api', '/');
        // },
        changeOrigin: true,
      },
      echarts: {
        target: 'http://echarts.baidu.com',
        filter(pathname, req) {
          const isApi = pathname.indexOf('/gallery') == 0;
          const ret = isApi;
          console.info('pathname', pathname, ret);
          return ret;
        },
        changeOrigin: true,
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
};

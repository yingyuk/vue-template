// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    dllDirectory: 'dll',
    assetsPublicPath: '/', // '/cdn/'
  },
  dev: {
    env: require('./dev.env'),
    port: 8765,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    debug: true,
    proxyTable: [
      {
        context: ['/dev-prefix/search'],
        // 注意是否是 https
        target: 'https://api.github.com',
        pathRewrite(uri) {
          return uri.replace('/dev-prefix', '');
        },
        changeOrigin: true,
        onProxyRes(proxyRes) {
          if (!isProd) {
            /* eslint no-underscore-dangle: 0 */
            proxyRes.headers.target = proxyRes.client._host + proxyRes.client.parser.outgoing.path;
          }
        },
      },
      {
        context: ['/dev-prefix/api'],
        // 注意是否是 https
        target: 'https://wfc2017-api.weddingee.com',
        pathRewrite(uri) {
          return uri.replace('/dev-prefix', '');
        },
        changeOrigin: true,
        onProxyRes(proxyRes) {
          if (!isProd) {
            /* eslint no-underscore-dangle: 0 */
            proxyRes.headers.target = proxyRes.client._host + proxyRes.client.parser.outgoing.path;
          }
        },
      },
    ],
  },
};

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const proxyMiddleware = require('http-proxy-middleware'); // 中间代理

const config = require('../config');
const routers = require('./router');

const port = process.env.PORT || 9237;
const isProd = process.env.NODE_ENV === 'production';

const { build: { assetsRoot, assetsSubDirectory } } = config;

const resolve = file => path.resolve(__dirname, assetsRoot, file);

const app = express();

app.use(compression({ threshold: 0 }));
app.use(favicon(resolve('./static/favicon.png')));

const staticDir = resolve(assetsSubDirectory);

app.use(
  `/${assetsSubDirectory}`,
  express.static(staticDir, {
    maxAge: isProd ? 60 * 60 * 24 * 30 : 0,
  })
);

routers(app);

const { proxyTable } = config.dev;
proxyTable.forEach(context => {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

app.listen(port, () => {
  console.info(`server started at http://localhost:${port}`);
});

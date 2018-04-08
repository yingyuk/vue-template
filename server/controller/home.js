const fs = require('fs');
const path = require('path');
const express = require('express');
const LRU = require('lru-cache'); // 删除使用率低的缓存
const { createBundleRenderer } = require('vue-server-renderer');

const config = require('../../config');

const router = express.Router();

const isProd = process.env.NODE_ENV === 'production';

const resolve = file => path.resolve(__dirname, config.build.assetsRoot, file);

const temp = fs.readFileSync(config.build.index, 'utf-8');
const template = temp.replace('<div id=app></div>', '<!--vue-ssr-outlet-->');

const bundlePath = resolve('./vue-ssr-bundle.json');

// eslint-disable-next-line
const bundle = require(bundlePath); // json 数据

const renderer = createBundleRenderer(bundle, {
  template,
  // clientManifest,
  // for component caching
  cache: LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15,
  }),
  // 包地址的引用, https://github.com/vuejs/vue/commit/8d885128371c81994715691c81d161b3768706dd
  basedir: path.resolve(__dirname),
  // recommended for performance
  runInNewContext: false,
});

const microCache = LRU({
  max: 100,
  maxAge: 1000,
});

router.get('*', (req, res) => {
  const s = Date.now();

  res.setHeader('Content-Type', 'text/html');

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url);
    } else if (err.code === 404) {
      res.status(404).end('404 | Page Not Found');
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err.stack);
    }
  };

  const cacheable = process.env.MICRO_CACHE !== 'false';
  if (cacheable) {
    const hit = microCache.get(req.url);
    if (hit) {
      if (!isProd) {
        console.info('cache hit!');
      }
      res.end(hit);
      return;
    }
  }

  const context = {
    title: 'Vue HN 2.0', // default title
    url: req.url,
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      handleError(err);
      return;
    }
    res.end(html);
    if (cacheable) {
      microCache.set(req.url, html);
    }
    if (!isProd) {
      console.info(`whole request: ${Date.now() - s}ms`);
    }
  });
});

module.exports = router;

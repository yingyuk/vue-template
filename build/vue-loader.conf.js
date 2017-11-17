const isProd = process.env.NODE_ENV === 'production';
const isServer = process.env.VUE_ENV === 'server';

module.exports = {
  extractCSS: isProd && !isServer,
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 6', 'Android >= 4.0'],
    }),
  ],
};

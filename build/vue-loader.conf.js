const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: [
        'iOS >= 7',
        'Android >= 4.1',
      ],
    }),
  ],
};

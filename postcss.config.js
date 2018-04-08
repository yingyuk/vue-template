// http://cssnext.io/usage/

const isProd = process.env.NODE_ENV === 'production';

// console.log('process.env', process.env);
module.exports = {
  // parser: 'sugarss', // 没有用到 .sss 文件, 所以注释
  plugins: {
    // 'postcss-import': {}, // 因为是和 css-loader 一起使用, 所以不需要 import 了
    'postcss-cssnext': isProd
      ? {
        browsers: ['iOS >= 6', 'Android >= 4.0'],
      }
      : false,
    // http://cssnano.co/guides/getting-started/
    // cssnano 与 css-loader 捆绑在一起,
    // 因为 postcss-loader 是和 css-loader 一起使用, 所以注释
    // cssnano: {},
  },
};

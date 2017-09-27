module.exports = {
  root: true,
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  plugins: [
    'import',
    'html',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  'globals': {
    'document': true
  },
  rules: {
    // 没有找到模块
    'import/extensions': ['off', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'import/no-unresolved': [0, { commonjs: true, amd: true }],
    // 允许 console warn, error
    'no-console': [
      'error', {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'linebreak-style': 0, // 回车风格不报错
    indent: ['error', 2], // 缩进2个空格
    'no-unused-expressions': ['error', {
      allowTernary: true,
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
  },
};

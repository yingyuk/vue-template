const OFF = 0;
const ERROR = 2;

module.exports = {
  root: true,
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  plugins: ['import', 'html'],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  globals: {
    document: true,
    _hmt: true, // 百度统计
    IS_SERVER: true, // 是否是服务器渲染环境
    MessageBox: true,
    SERVICE_WORKER: true,
    Indicator: true,
  },
  rules: {
    // 没有找到模块
    'import/extensions': [
      'off',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'object-curly-newline': OFF, // 一行超长了, 才换行
    'import/no-unresolved': [OFF, { commonjs: true, amd: true }],
    // 允许 console warn, error
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'arrow-parens': OFF,
    'linebreak-style': OFF, // 回车风格不报错
    indent: ['error', 2], // 缩进2个空格
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true,
        allowShortCircuit: true,
      },
    ],
    'global-require': OFF, // 可以使用 require(); 用于 require(图片)
    'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : OFF,
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    'func-names': ['error', 'never'],
    // 允许改对象类型的参数, 比如 vuex 里的 state
    'no-param-reassign': ['error', { props: false }],
    // 允许重复命名相同名字的变量, 比如 vuex 里的 state
    'no-shadow': ['error', { allow: ['state'] }],
    // 箭头函数
    'arrow-parens': ['error', 'as-needed'],
    // 逗号
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'function-paren-newline': OFF,
  },
};

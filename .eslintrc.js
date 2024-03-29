// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['html', 'prettier'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    'prettier/prettier': ['off', { singleQuote: true }],
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never'
      }
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js']
      }
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow vars '_' to be unused
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_$'
      }
    ],
    // allow mutation of props
    'no-param-reassign': [
      'error',
      {
        props: false
      }
    ],
    // allow await in loop
    'no-await-in-loop': 'off',
    'class-methods-use-this': ['error', { exceptMethods: ['cursor'] }]
  }
};

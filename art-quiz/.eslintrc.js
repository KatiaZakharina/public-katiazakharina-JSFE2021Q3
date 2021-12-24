module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier', 'import'],
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
  },
};

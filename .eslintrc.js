module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'comma-dangle': ['error', 'never'],
    // 'max-len': ['error', { code: 120 }],
    'no-param-reassign': ['warn', { props: false }],
    'no-unused-vars': 'warn',
    'object-curly-newline': ['error', { consistent: true }],
    'quote-props': ['error', 'consistent'],
    'space-before-function-paren': ['error', 'always'],
    'prefer-promise-reject-errors': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'no-async-promise-executor': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  }
}

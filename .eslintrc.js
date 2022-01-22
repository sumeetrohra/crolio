module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'linebreak-style': ['error', 'unix'],
    quotes: 'off',
    semi: ['error', 'always'],
    'react/prop-types': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
  },
};

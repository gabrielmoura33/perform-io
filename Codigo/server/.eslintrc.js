module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      'argsIgnorePattern': '_'
    }],
    'prettier/prettier': 'error',
    'class-methods-use-this':'off',
    '@typescript-eslint/interface-name-prefix': ['error', {"prefixWithI": "always"}],
    'no-useless-constructor': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never'
      }
    ],
    'no-underscore-dangle': 'off'
  },
  settings: {
    'import/resolver': {
      'typescript': {}
    }
  }
};

module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'object-curly-spacing': [
      2,
      'always'
    ],
    "max-depth": [
      1,
      3
    ],
    "max-len": [
      "error", 
      { 
        "code": 120,
        "ignoreStrings": true,
        "ignoreUrls": true,
        "ignoreTrailingComments": true
      }
    ],
    "max-statements": [
      1,
      50
    ],
    "new-cap": 1,
    "no-extend-native": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-trailing-spaces": 2,
    "no-unused-vars": "error",
    "no-use-before-define": [
      2,
      "nofunc"
    ],
    "object-curly-spacing": [
      2,
      "always"
    ],
  },
};

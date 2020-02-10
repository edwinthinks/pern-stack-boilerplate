module.exports = {
  env: {
    node: true,
    es6: true
  },
  plugins: ["jest"],
  extends: [
    'plugin:jest/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'promise/param-names': 'off'
  }
}

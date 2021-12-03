module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "indent": [
      "error",
      4
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "vue/require-component-is": "off",
    "vue/max-attributes-per-line": [
      "error",
      {
        "singleline": 4,
        "multiline": {
          "max": 1,
          "allowFirstLine": true
        }
      }
    ],
    "vue/no-v-html": "off",
    "vue/html-indent": [
      "error",
      4
    ],
    "multiline-ternary": [
      "error",
      "never"
    ],
    "eqeqeq": [
      "error",
      "always"
    ],
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        "registeredComponentsOnly": false,
        "ignores": []
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

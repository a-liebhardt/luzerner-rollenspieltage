module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'import',
  ],
  env: {
    browser: true,
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    'no-tabs': 1,
    'prefer-arrow-callback': 0,
    'func-names': 0,
    'spaced-comment': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'linebreak-style': 0,
    'arrow-body-style': 0,
    'no-console': ["error", { allow: ["warn", "error"] }],
    'radix': 0,
    'class-methods-use-this': 0,
  },
};

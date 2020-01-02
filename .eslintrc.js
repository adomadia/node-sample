module.exports = {
    parser: 'babel-eslint',
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    env: {
        es6: true,
        browser: true,
        node: true,
        jquery: true,
        mocha: true
    },
    rules: {
        quotes: ['warn', 'single', {allowTemplateLiterals: true}],
        'brace-style': ['warn', '1tbs', {allowSingleLine: false}],
        'prefer-const': ['error', {destructuring: 'any'}],
        'no-loop-func': 2,
        indent: ['error', 4],
        'no-debugger': 1,
        'require-await': 2,
        'no-var': 1,
        semi: [1, 'always'],
        'no-trailing-spaces': 0,
        'eol-last': 0,
        'no-unused-vars': ['error', {vars: 'all', args: 'none', ignoreRestSiblings: false}],
        'no-underscore-dangle': 0,
        'no-alert': 0,
        'no-lone-blocks': 0,
        'no-console': 1,
        'comma-dangle': 0,
        'comma-spacing': 0,
        'no-useless-return': 0,
        'key-spacing': 1,
        'no-eval': 1
    }
};


module.exports = {
    "extends": "airbnb-base",
    "env"
    : {
        "browser": true,
        "mocha": true
    },
    "plugins": [
        "import"
    ],
    "parser": "typescript-eslint-parser",
    rules: {
        "no-dupe-class-members":'warn',
        "strict":0,
        "camelcase":'warn',
        "function-paren-newline":'warn',
        "prefer-arrow-callback": ["error", { "allowNamedFunctions": true }],
        "no-unused-vars": [1, { "vars": "local", "args": "none", "varsIgnorePattern": "/^[A-Z][a-z0-9_-]{3,19}$/" }],
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
        "no-debugger": 0,
        "no-await-in-loop": 'warn',
        "indent": 0,
        "linebreak-style": 0,
        "comma-dangle": 0,
        "no-unused-expressions": "warn",
        "no-use-before-define": "warn",
        "no-throw-literal": 0,
        "prefer-const": 0,
        "prefer-rest-params": 0,
        "default-case": 'warn',
        "no-undef": 0,
        "no-shadow": 'warn',
        "no-lonely-if": 0,
        "no-return-assign": 'warn',
        "no-plusplus": 0,
        "no-param-reassign": 0,
        "max-len": 0,
        "no-trailing-spaces": 0,
        "no-console": 0,
        "no-confusing-arrow": 0,
        "class-methods-use-this": 0,
        "no-underscore-dangle": 0,
        "one-var-declaration-per-line": ["error", "initializations"],
        "one-var": ["error", { "initialized": "never", "uninitialized": "always" }]
    },
    "globals": {
    }
};
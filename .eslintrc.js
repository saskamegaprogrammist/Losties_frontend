module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint/eslint-plugin',
    ],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/no-var-requires' :  ["warn"],
        '@typescript-eslint/ban-ts-ignore' : ["warn"]
    }
};
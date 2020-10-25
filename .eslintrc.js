module.exports = {
    extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error'],
        // indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
    },
}
// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   extends: [
//     // 'google',
//     'prettier',
//     // 'plugin:@typescript-eslint/recommended',
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: 'module',
//   },
//   plugins: [
//     // '@typescript-eslint',
//     'prettier',
//   ],
//   rules: {
//     'prettier/prettier': ['error'],
//     indent: ['error', 2],
//     'linebreak-style': ['error', 'unix'],
//     quotes: ['error', 'single'],
//     semi: ['error', 'never'],
//   },
// }

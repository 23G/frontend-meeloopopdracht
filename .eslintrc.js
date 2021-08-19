module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
    },
    extends: ['airbnb-base', '@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
    plugins: [],
    // add your custom rules here
    rules: {
        'prettier/prettier': 0,
        'no-console': 0,
        'no-param-reassign': [
            'error',
            {
                ignorePropertyModificationsFor: ['state'],
            },
        ],
        'no-shadow': [
            'error',
            {
                allow: ['getters', 'state'],
            },
        ],
        'vue/no-v-html': 0,
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': 0,
        'vue/singleline-html-element-content-newline': 0,
    },
};

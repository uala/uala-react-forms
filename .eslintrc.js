module.exports = {
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true
        }
    },
    extends: 'airbnb',
    env: {
        node: true,
        browser: true,
        jest: true
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src', 'node_modules']
            }
        }
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'function-paren-newline': ['error', 'multiline'],
        'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
        'jsx-a11y/media-has-caption': 0,
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/stories/*.js'] }]
    }
};

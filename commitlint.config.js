module.exports = {
    extends: [
        '@commitlint/config-conventional'
    ],
    formatter: '@commitlint/format',
    parserPreset: './parser-preset',
    rules: {
        'body-leading-blank': [2, 'always'],
        'body-max-length': [1, 'always', 300],
        'body-min-length': [2, 'always', 30],
        'footer-leading-blank': [1, 'always'],
        'scope-empty': [2, 'always'],
        'subject-case': [2, 'always', 'sentence-case'],
        'subject-empty': [2, 'never'],
        'type-empty': [2, 'always']
    }
};



module.exports = {
    root: true,
    plugins: [ 'import'],
    extends: [
        'airbnb-typescript',
        'prettier',
    ],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/lines-between-class-members": "off",
        "@typescript-eslint/no-redeclare": "off",
        "react/jsx-filename-extension": "off"
    }
};

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'prettier'],
  rules: {
    'no-console': 'error',
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'react/jsx-props-no-spreading': 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['accumulator', 'response'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal'],
          ['sibling', 'parent'],
          ['index'],
        ],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

import libraryConfig from '@repo/eslint-config/react-internal.js';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  ...libraryConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.lint.json',
      },
    },
  },
];

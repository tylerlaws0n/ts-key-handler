import eslintConfigPrettier from 'eslint-config-prettier';
// import eslintConfigTurbo from 'eslint-config-turbo';
import tsEslint from 'typescript-eslint';
import js from '@eslint/js';

import { resolve } from 'node:path';

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  eslintConfigPrettier,
  js.configs.recommended,
  // eslintConfigTurbo,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  {
    languageOptions: {
      globals: {
        React: true,
        JSX: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project,
        },
      },
    },
    ignores: ['node_modules/', 'dist/*', 'dist/**/*', 'dist'],
  },
];

import eslintConfigPrettier from 'eslint-config-prettier';
import turbo from 'eslint-plugin-turbo';
import tsEslint from 'typescript-eslint';
import js from '@eslint/js';

import { resolve } from 'node:path';

/** @type {import('eslint').Linter.FlatConfig} */
const turboConfig = {
  plugins: { turbo },
  rules: {
    ...turbo.configs.recommended.rules,
  },
  settings: {
    ...turbo.configs.recommended.settings,
  },
};

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  eslintConfigPrettier,
  js.configs.recommended,
  turboConfig,
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
    ignores: ['node_modules/', 'dist/'],
  },
];

import eslintConfigPrettier from 'eslint-config-prettier';
import turbo from 'eslint-plugin-turbo';
import tsEslint from 'typescript-eslint';
import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { resolve } from 'node:path';

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

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

/** @type {import('eslint').Linter.FlatConfig} */
const reactHooksConfig = {
  plugins: {
    'react-hooks': reactHooksPlugin,
  },
  rules: reactHooksPlugin.configs.recommended.rules,
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  eslintConfigPrettier,
  js.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  reactRecommended,
  reactHooksConfig,
  turboConfig,
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project,
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
];

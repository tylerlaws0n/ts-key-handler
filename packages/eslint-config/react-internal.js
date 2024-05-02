import libraryConfig from './library.js';

import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig} */
const reactHooksConfig = {
  plugins: {
    'react-hooks': reactHooksPlugin,
  },
  rules: reactHooksPlugin.configs.recommended.rules,
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...libraryConfig,
  reactRecommended,
  reactHooksConfig,
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

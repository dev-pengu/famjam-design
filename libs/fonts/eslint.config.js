import { config } from '@org/eslint-config/base';
import jest from 'eslint-plugin-jest';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    files: ['**/__tests__/**/*[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ...jest.configs['flat/recommended'],
  },
  {
    files: ['src/__mocks__/**/*.js'],
    languageOptions: {
      globals: {
        module: 'readonly',
        exports: 'readonly',
        require: 'readonly',
      },
    },
  },
];

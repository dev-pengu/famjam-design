import { config } from '@org/eslint-config/react-internal';
import testingLibrary from 'eslint-plugin-testing-library';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ...testingLibrary.configs['flat/react'],
  },
];

import js from '@eslint/js';
import eslintConfigPrettier, { rules } from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import onlyWarn from 'eslint-plugin-only-warn';

export const config = [
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    rules: {
      eqeqeq: ['error', 'always'],
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ['dist/**'],
  },
];

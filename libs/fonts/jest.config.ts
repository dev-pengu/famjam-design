import { createDefaultPreset } from 'ts-jest';
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  displayName: '@famjam/fonts',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*\\.js$': '$1',
    '^@famjam/tokens/ui.styles$': '<rootDir>/src/__mocks__/tokensMock.js',
  },
  transform: createDefaultPreset({ tsconfig: '<rootDir>/tsconfig.lib.json' }).transform,
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['src/native/**/*.ts', '!src/**/*.d..ts'],
};

export default config;

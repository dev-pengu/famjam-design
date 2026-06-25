import { createDefaultPreset } from 'ts-jest';
import type { Config } from 'jest';

const projectConfigDefaults = (platform = 'web'): Partial<Config> => ({
  displayName: `@famjam/ui (${platform})`,
  testMatch: [`**/*.${platform}.test.{ts,tsx}`],
  moduleFileExtensions: [`${platform}.ts`, `${platform}.tsx`, 'ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs', 'json', 'node'],
});

const config: Config = {
  coverageThreshold: {
    global: {
      lines: 0,
      branches: 0,
    },
  },
  projects: [
    {
      ...projectConfigDefaults('web'),
      testEnvironment: 'jsdom',
      transform: createDefaultPreset({ tsconfig: '<rootDir>/tsconfig.lib.json' }).transform,
      coveragePathIgnorePatterns: ['src/__mocks__'],
      moduleFileExtensions: ['web.ts', 'web.tsx', 'ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      moduleNameMapper: {
        '^@famjam/icons(/.*)?$': '<rootDir>/src/__mocks__/icons.web.mock.tsx',
        '^.+\\.css$': '<rootDir>/src/__mocks__/styleMock.js',
      },
      transformIgnorePatterns: ['/node_modules/(?!.*@famjam/tokens)'],
      setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
    },
    {
      ...projectConfigDefaults('native'),
      preset: 'react-native',
      moduleFileExtensions: ['native.ts', 'native.tsx', 'ts', 'tsx', 'js', 'json'],
      moduleNameMapper: {
        '^@famjam/icons(/.*)?$': '<rootDir>/src/__mocks__/icons.native.mock.tsx',
      },
      transform: {
        '^.+\\.(js|ts|tsx)$': [
          'babel-jest',
          {
            presets: ['babel-preset-expo'],
          },
        ],
      },
      transformIgnorePatterns: ['node_modules/(?!.pnpm/)?(?!(jest-)?react-native|@react-native(-community)?)/'],
    },
  ] as Config[],
};

export default config;

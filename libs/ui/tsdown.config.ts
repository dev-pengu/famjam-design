/// <references types="node" />
import { defineConfig } from 'tsdown';
import { globSync } from 'node:fs';
import { cssModules } from './tsdown-plugin-css-modules.ts';

const entry = [
  'src/index.ts',
  ...globSync('src/components/**/*.tsx').filter((file) => {
    const parts = file.split('/');
    const componentName = parts[parts.length - 2];
    const fileName = parts[parts.length - 1];
    const componentRegex = new RegExp(`^${componentName}(?:\\.web|\\.native)?\\.tsx$`);
    return componentRegex.test(fileName);
  }),
];

export default defineConfig({
  entry,
  dts: { build: true },
  platform: 'neutral',
  format: ['cjs', 'esm'],
  deps: {
    neverBundle: ['react', 'react-dom', 'react-native', '@famjam/tokens'],
  },
  inputOptions: {
    resolve: {
      extensions: ['.web.tsx', '.native.tsx', '.web.ts', '.native.ts', '.tsx', '.ts', '.jsx', '.js', '.json'],
    },
  },
  plugins: [cssModules()],
  copy: ['package.json', 'README.md'],
});

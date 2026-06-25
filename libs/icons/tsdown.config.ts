import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.web.ts', 'src/index.native.ts'],
  dts: false,
  format: ['esm'],
  platform: 'neutral',
  deps: {
    neverBundle: ['react', 'react/jsx-runtime', 'react-native-svg'],
  },
  inputOptions: {
    resolve: {
      extensions: ['.web.tsx', '.native.tsx', '.tsx', '.web.ts', '.native.ts', '.ts', '.jsx', '.js', '.json'],
    },
  },
  copy: ['package.json', 'README.md'],
});

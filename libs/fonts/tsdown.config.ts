import { defineConfig } from 'tsdown';
import { fontsCssPlugin } from './tsdown-plugin-fonts-css.ts';

export default defineConfig({
  entry: ['src/config/native.ts', 'src/native/index.ts'],
  dts: { build: true },
  format: ['cjs', 'esm'],
  platform: 'neutral',
  deps: {
    neverBundle: ['node:fs', 'node:path', 'node:url'],
  },
  plugins: [fontsCssPlugin()],
  outDir: 'dist',
});

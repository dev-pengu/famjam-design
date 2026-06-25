/// <reference types="node" />
import type { Rolldown } from 'tsdown';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FontFamily } from '@famjam/tokens/ui.styles';

const fontFamilyRoboto = FontFamily.Roboto;

const CDN_FONT_DIR_PATH = ''; // TODO
const LOCAL_FONT_DIR_PATH = '../assets/roboto/woff2/';
const workspaceDir = process.env.NX_WORKSPACE_ROOT || process.env.INIT_CWD;

function createFontsCssContent(): string {
  const variants = [
    { style: 'normal', file: 'Roboto-Regular.woff2' },
    { style: 'italic', file: 'Roboto-Italic.woff2' },
  ];
  return variants
    .map(
      ({ style, file }) => `@font-face {
    font-family: '${fontFamilyRoboto}';
    font-stretch: 75% 100%;
    font-style: ${style};
    font-weight: 100 700;
    font-display: swap;
    src: url('${LOCAL_FONT_DIR_PATH}${file}') format('woff2'),
         url('${CDN_FONT_DIR_PATH}${file}') format('woff2');
}
`,
    )
    .join('\n\n');
}

export function fontsCssPlugin(): Rolldown.Plugin {
  let hasWrittenFontsCss = false;

  return {
    name: 'famjam-fonts-css-generator',
    async generateBundle(outputOptions, _bundle, isWrite) {
      if (!isWrite || hasWrittenFontsCss) {
        return;
      }

      if (outputOptions.format !== 'es') {
        return;
      }

      const packageRoot = dirname(fileURLToPath(import.meta.url));
      const distDir = join(workspaceDir!, 'dist/libs/fonts');

      await mkdir(distDir, { recursive: true });
      await writeFile(join(distDir, 'fonts.css'), createFontsCssContent());

      hasWrittenFontsCss = true;
    },
  };
}

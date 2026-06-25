import { globSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const directoryName = typeof __dirname === 'string' ? __dirname : dirname(fileURLToPath(import.meta.url));
const assetsDirectory = join(directoryName, '../assets');

export const fontAssets = globSync('*/ttf', { cwd: assetsDirectory }).map((path) => join(assetsDirectory, path));

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import config from './style-dictionary.config.js';

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DIST_PATH = path.resolve(ROOT_DIR, 'dist');

fs.rmSync(DIST_PATH, { recursive: true, force: true });

config.forEach((buildConfig) => {
    const styleDictionary = new StyleDictionary(buildConfig);
    styleDictionary.buildAllPlatforms();
})
import fs from 'node:fs';
import { platform } from 'node:os';
import path, { format } from 'node:path';
import { sourceMapsEnabled } from 'node:process';
import StyleDictionary from 'style-dictionary';
import { transformGroups } from 'style-dictionary/enums';

//----------------------------------
// CONSTANTS
//----------------------------------

const DEFAULT_THEME = 'base';
const ROOT_FILE_NAME = 'ui';
const DIST_PATH = 'dist/';

const CSS_EXT = '.css';
const JS_EXT = '.js';
const TYPE_EXT = '.d.ts';
const JSON_EXT = '.json';

const WEB_EXT = '.web';
const STYLE_EXT = '.styles';
const NATIVE_EXT = '.native';
const TOKEN_EXT = '.tokens';

const TOKENS_ROOT = './src';

const FORMAT_FOR_WEB = 'css/variables';
const FORMAT_FOR_WEB_JS = 'javascript/theme-css-entry';
const FORMAT_FOR_NATIVE_GROUPED = 'javascript/grouped-tokens';
const FORMAT_FOR_NATIVE_GROUPED_TYPES = 'typescript/grouped-tokens';
const FORMAT_FOR_NATIVE_JS = 'javascript/theme-js-entry';
const FORMAT_FOR_THEME_INDEX_TYPES = 'typescript/theme-js-entry';
const FORMAT_NUMBER_PX_FOR_WEB = 'value/number-px-web';

const RN_TRANSFORM_GROUP = 'react-native';
const CSS_TRANSFORM_GROUP = 'css';
const CSS_TRANSFORM_GROUP_WITH_NUMBER_PX = 'css-with-number-px';

const FILTER_EXCLUDE_THEMES = 'exclude-themes';
const FILTER_EXCLUDE_ROOT = 'exclude-root';

//-----------------------------------
// FILTERS
//-----------------------------------
StyleDictionary.registerFilter({
  name: FILTER_EXCLUDE_ROOT,
  filter: (token) => {
    const filePath = token.filePath.replace(/\\/g, '/');
    return filePath.indexOf('/') !== filePath.lastIndexOf('/');
  },
});

StyleDictionary.registerFilter({
  name: FILTER_EXCLUDE_THEMES,
  filter: (token) => {
    const filePath = token.filePath.replace(/\\/g, '/');
    return filePath.indexOf('/') === filePath.lastIndexOf('/');
  },
});

StyleDictionary.registerTransform({
  name: FORMAT_NUMBER_PX_FOR_WEB,
  type: 'value',
  filter: (token) => (token.$type ?? token.type) == 'number',
  transform: (token) => `${token.$value ?? token.value}px`,
});

StyleDictionary.registerTransformGroup({
  name: CSS_TRANSFORM_GROUP_WITH_NUMBER_PX,
  transforms: [...StyleDictionary.hooks.transformGroups.css, FORMAT_NUMBER_PX_FOR_WEB],
});

//----------------------------
// HELPERS FOR GROUPED TOKENS
//----------------------------
function toPascalCase(str) {
  return String(str)
    .replace(/[-_.]/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace(/\s+/g, '');
}

function getTokenGroup(token) {
  return token.path[0] ?? 'unknown';
}

function getTokenKey(token) {
  return token.path
    .slice(1)
    .map((seg) => {
      if (isNaN(seg)) return toPascalCase(seg);
      return `v${seg}`;
    })
    .join('');
}

function getTokenValue(token) {
  const v = token.$value ?? token.value ?? token.original?.value;

  if (v && typeof v === 'object') {
    if (v.hex) return v.hex;
  }

  return v;
}

function groupTokens(dictionary) {
  const grouped = {};

  dictionary.allTokens.forEach((token) => {
    const group = getTokenGroup(token);
    if (!grouped[group]) grouped[group] = [];

    grouped[group].push({
      key: getTokenKey(token),
      value: getTokenValue(token),
    });
  });

  return grouped;
}

//-------------------------------
// FORMATS
//-------------------------------

StyleDictionary.registerFormat({
  name: FORMAT_FOR_NATIVE_GROUPED,
  format: ({ dictionary }) => {
    const grouped = groupTokens(dictionary);

    return Object.entries(grouped)
      .map(([group, entries]) => {
        const name = toPascalCase(group);
        const body = entries.map(({ key, value }) => `  ${key}: ${JSON.stringify(value)},`).join('\n');

        return `export const ${name} = {\n${body}\n};`;
      })
      .join('\n\n');
  },
});

StyleDictionary.registerFormat({
  name: FORMAT_FOR_NATIVE_GROUPED_TYPES,
  format: ({ dictionary }) => {
    const grouped = groupTokens(dictionary);

    return Object.entries(grouped)
      .map(([group, entries]) => {
        const name = toPascalCase(group);
        const enumBody = entries
          .map(({ key, value }) => `  ${key} = ${typeof value === 'string' ? `"${value}"` : value},`)
          .join('\n');

        return `
export declare enum ${name} {
${enumBody}
}            
`;
      })
      .join('\n');
  },
});

StyleDictionary.registerFormat({
  name: FORMAT_FOR_WEB_JS,
  format: function ({ file }) {
    const themeName = file.destination.split('.')[0];
    const cssFile = `${ROOT_FILE_NAME}${WEB_EXT}${CSS_EXT}`;
    const cssThemeFile = `${themeName}${WEB_EXT}${CSS_EXT}`;
    const isSameFile = cssThemeFile === cssFile;

    const imports = isSameFile ? [`import "./${cssFile}";`] : [`import "./${cssFile}";`, `import "./${cssThemeFile}";`];
    return [...imports, `export default { theme: '${themeName}' };`].join('\n');
  },
});

StyleDictionary.registerFormat({
  name: FORMAT_FOR_NATIVE_JS,
  format: function ({ file }) {
    const themeName = file.destination.split('.')[0];
    const tokensFile = `${ROOT_FILE_NAME}${STYLE_EXT}`;
    const themeTokensFile = file.destination.replace(`${NATIVE_EXT}${JS_EXT}`, STYLE_EXT);
    const isSameFile = themeTokensFile === tokensFile;

    if (isSameFile) {
      return [
        `import * as tokens from "./${tokensFile}";`,
        `export default { theme: '${themeName}', tokens: { ...tokens } };`,
      ].join('\n');
    }

    return [
      `import * as tokens from "./${tokensFile}";`,
      `import * as themeTokens from "./${themeTokensFile}";`,
      `export default { theme: '${themeName}', tokens: { ...tokens, ...themeTokens } };`,
    ].join('\n');
  },
});

StyleDictionary.registerFormat({
  name: FORMAT_FOR_THEME_INDEX_TYPES,
  format: function ({ file }) {
    const themeName = file.destination.split('.')[0];
    const tokensFile = `${ROOT_FILE_NAME}${STYLE_EXT}`;
    const themeTokensFile = file.destination
      .replace(`${WEB_EXT}${TYPE_EXT}`, STYLE_EXT)
      .replace(`${NATIVE_EXT}${TYPE_EXT}`, STYLE_EXT);
    const isSameFile = themeTokensFile === tokensFile;

    if (isSameFile) {
      return [
        `import * as tokens from "./${tokensFile}";`,
        `export type ThemeTokens = typeof tokens;`,
        `declare const theme: { theme: '${themeName}', tokens: ThemeTokens | undefined };`,
        `export default theme;`,
      ].join('\n');
    }

    return [
      `import * as tokens from "./${tokensFile}";`,
      `import * as themeTokens from "./${themeTokensFile}";`,
      `export type ThemeTokens = typeof tokens & typeof themeTokens;`,
      `declare const theme: { theme: '${themeName}', tokens: ThemeTokens | undefined };`,
      `export default theme;`,
    ].join('\n');
  },
});

//------------------------------
// BUILD
//------------------------------
function getTokenFiles(folder) {
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(`${TOKEN_EXT}${JSON_EXT}`))
    .map((f) => path.join(folder, f).replace(/\\/g, '/'));
}

function createConfigForTheme(themeName, tokenFiles, filter) {
  const isDefault = themeName === DEFAULT_THEME || themeName === ROOT_FILE_NAME;
  const rootFiles = getTokenFiles(TOKENS_ROOT);
  const combinedFiles = [...rootFiles, ...tokenFiles];
  const buildPath = DIST_PATH;

  return {
    source: combinedFiles,
    platforms: {
      [CSS_TRANSFORM_GROUP]: {
        transformGroup: CSS_TRANSFORM_GROUP_WITH_NUMBER_PX,
        buildPath,
        files: [
          {
            source: combinedFiles,
            filter: filter,
            destination: `${themeName}${WEB_EXT}${CSS_EXT}`,
            format: FORMAT_FOR_WEB,
            options: { selector: isDefault ? undefined : `[data-theme="${themeName}"]` },
          },
          {
            source: combinedFiles,
            filter: filter,
            destination: `${themeName}${WEB_EXT}${JS_EXT}`,
            format: FORMAT_FOR_WEB_JS,
          },
          {
            source: combinedFiles,
            filter: filter,
            destination: `${themeName}${WEB_EXT}${TYPE_EXT}`,
            format: FORMAT_FOR_THEME_INDEX_TYPES,
          },
        ],
      },
      [RN_TRANSFORM_GROUP]: {
        transformGroup: RN_TRANSFORM_GROUP,
        buildPath,
        files: [
          {
            source: combinedFiles,
            filter: filter,
            destination: `${themeName}${STYLE_EXT}${JS_EXT}`,
            format: FORMAT_FOR_NATIVE_GROUPED,
          },
          {
            source: combinedFiles,
            filter: filter,
            destination: `${themeName}${STYLE_EXT}${TYPE_EXT}`,
            format: FORMAT_FOR_NATIVE_GROUPED_TYPES,
          },
          {
            source: combinedFiles,
            filter: filter,
            destination: `${themeName}${NATIVE_EXT}${JS_EXT}`,
            format: FORMAT_FOR_NATIVE_JS,
          },
          {
            source: combinedFiles,
            filter: filter,
            destination: `${themeName}${NATIVE_EXT}${TYPE_EXT}`,
            format: FORMAT_FOR_THEME_INDEX_TYPES,
          },
        ],
      },
    },
  };
}

const configs = [];

const themeFolders = fs
  .readdirSync(TOKENS_ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

themeFolders.forEach((themeName) => {
  const folderPath = path.join(TOKENS_ROOT, themeName).replace(/\\/g, '/');
  const tokenFiles = getTokenFiles(folderPath);
  if (tokenFiles.length) {
    configs.push(createConfigForTheme(themeName, tokenFiles, FILTER_EXCLUDE_ROOT));
  }
});

const rootFiles = getTokenFiles(TOKENS_ROOT);

if (rootFiles.length) {
  configs.push(createConfigForTheme(ROOT_FILE_NAME, [], FILTER_EXCLUDE_THEMES));
}

export default configs;

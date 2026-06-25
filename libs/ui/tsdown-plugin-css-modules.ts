import type { Rolldown } from 'tsdown';
import { posix as path } from 'node:path';
import LightningCSS from 'unplugin-lightningcss/rolldown';

const HASHED_CSS_FILE = /-[^/.-]+\.css$/;
const HASHED_JS_FILE = /-[^/.-]+\.(?:m?js|cjs)$/;
const JS_CHUNK_FILE = /\.(?:m?js|cjs)$/;

/**
 * Inject CSS imports into component chunks that have corresponding CSS assets.
 *
 * Two-pass strategy:
 * 1. Map emitted CSS files by their logical base name (strip hash)
 *    Example: input-CkaFxWCU.css -> "input"
 * 2. For each component chunk, find matching CSS by base name and prepend and import/require
 *    Example: input-BePCdCdw.js -> prepend "import './input-CkaFxWCU.css'"
 *
 * This ensures when consumers import a component, styles are automatically loaded.
 */
function injectCssModules(outputOptions: Rolldown.NormalizedOutputOptions, bundle: Rolldown.OutputBundle): void {
  // Pass 1
  const cssByBase = new Map<string, string>();

  for (const [filename, output] of Object.entries(bundle)) {
    if (output.type !== 'asset' || !filename.endsWith('.css')) continue;
    const base = filename.replace(HASHED_CSS_FILE, '');
    cssByBase.set(base, filename);
  }

  // Pass 2
  for (const [filename, output] of Object.entries(bundle)) {
    if (output.type !== 'chunk' || !JS_CHUNK_FILE.test(output.fileName)) continue;

    const base = filename.replace(HASHED_JS_FILE, '');
    const cssFile = cssByBase.get(base);
    if (!cssFile) continue;

    const cssPath = path.relative(path.dirname(output.fileName), cssFile);
    const relativeCssPath = cssPath.startsWith('.') ? cssPath : `./${cssPath}`;
    const injection =
      outputOptions.format === 'cjs' ? `require('${relativeCssPath}');\n` : `import '${relativeCssPath}';\n`;

    if (!output.code.includes(relativeCssPath)) {
      output.code = injection + output.code;
    }
  }
}

/**
 * Composite plugin that combines LightningCSS (for CSS extraction & CSS-module support)
 * with custom logic to auto-inject the extracted CSS back into component chunks.
 *
 * This way, consumers only need to
 * `import { Button } from '@famjam/ui'`
 * and styles are automatically included.
 *
 * @param options - Optional config object
 * @param options.lightningCSSOptions - Optional config to pass through to LightningCSS
 * @returns A single Rolldown plugin that provides support for CSS-modules with automatic injection
 */
export function cssModules({
  lightningCSSOptions,
}: { lightningCSSOptions?: Parameters<typeof LightningCSS>[0] } = {}): Rolldown.Plugin {
  const lightningCssPlugin = LightningCSS(lightningCSSOptions) as Rolldown.Plugin;

  return {
    ...lightningCssPlugin,
    name: 'lightningcss-with-injected-extracted-css',
    generateBundle(outputOptions, bundle, isWrite) {
      const generateBundleHook = lightningCssPlugin.generateBundle;
      if (generateBundleHook) {
        const handler = typeof generateBundleHook === 'function' ? generateBundleHook : generateBundleHook.handler;
        handler.call(this, outputOptions, bundle, isWrite);
      }

      injectCssModules(outputOptions, bundle);
    },
  };
}

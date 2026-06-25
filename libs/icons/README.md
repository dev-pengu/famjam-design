# icons

SVG assets and generated React icon components

## Usage

Import icon component registries from the package root:

```ts
import { icons } from '@famjam/icons';

const AccountIcon = icons['account'];
```

Optimized SVG assets can also be imported directly:

```ts
import accountIcon from '@famjam/icons/account.svg';
```

## Notes

This package ships generated React and React Native icon components.

Raw source SVG files are kept in `assets/`.

Optimized SVG files are in `dist/assets/`

`generate-icons` uses SVGR to generate platform components into `src`.

`tsdown` compiles generated sources to `dist/` for consumers.

`optimize` reads from `assets/` and writes optimized SVG files to `dist/assets/`.

## Optimization

To optimize all icons in this package:

```sh
npx nx optimize icons
```

## Building

To generate components and build distributable outputs:

```sh
npx nx build icons
```

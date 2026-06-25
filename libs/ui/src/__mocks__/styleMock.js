/* global module */

const toKebabCase = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const Color = new Proxy(
  {},
  {
    get: (_, key) => {
      if (typeof key !== 'string') return undefined;
      return `var(--${toKebabCase(key)})`;
    },
  },
);

const styleAndTokenMock = new Proxy(
  {
    Color,
  },
  {
    get: (target, key) => {
      if (key === '__esModule') return true;
      if (key === 'default') return styleAndTokenMock;
      if (key in target) return target[key];
      if (typeof key === 'string') return key;
      return undefined;
    },
  },
);

module.exports = styleAndTokenMock;

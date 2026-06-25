function createDynamicModuleExportMock() {
  return new Proxy(
    {},
    {
      get(target, prop) {
        if (typeof prop === 'symbol') return undefined;
        return new Proxy(
          {},
          {
            get(nestedTarget, nestedProp) {
              if (typeof nestedProp === 'symbol') return undefined;
              return String(nestedProp);
            },
          },
        );
      },
    },
  );
}

['', '/base.styles', '/ui.styles', '/base', '/dark', '/ui'].forEach((moduleName) => {
  jest.mock(`@famjam/tokens${moduleName}`, () => createDynamicModuleExportMock(), { virtual: true });
});

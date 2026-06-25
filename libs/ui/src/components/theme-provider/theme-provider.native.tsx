import { useState, useMemo } from 'react';
import type { Theme, ThemeContextProps, ThemeContextValue } from './theme-provider.types';
import { fallback, ThemeContext } from './theme-context';

export const ThemeProvider = ({ theme, children }: ThemeContextProps) => {
  const [themeState, setThemeState] = useState<Theme>(theme ?? fallback);
  const themeContextValue: ThemeContextValue = useMemo(
    () => ({
      theme: themeState,
      setTheme: setThemeState,
    }),
    [themeState],
  );

  return <ThemeContext.Provider value={themeContextValue}> {children}</ThemeContext.Provider>;
};

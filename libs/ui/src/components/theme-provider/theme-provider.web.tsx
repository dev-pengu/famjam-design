import { useState, useMemo, useEffect } from 'react';
import type { Theme, ThemeContextProps, ThemeContextValue } from './theme-provider.types';
import { fallback, ThemeContext } from './theme-context';
import '@famjam/fonts/fonts.css';

export const ThemeProvider = ({ theme, children }: ThemeContextProps) => {
  const [themeState, setThemeState] = useState<Theme>(theme ?? fallback);

  useEffect(() => {
    document.documentElement.dataset.theme = themeState.theme;
  }, [themeState]);

  const themeContextValue: ThemeContextValue = useMemo(() => {
    const setThemeStateAndDom = (theme: Theme) => {
      document.documentElement.dataset.theme = themeState.theme;
      setThemeState(theme);
    };

    return {
      theme: themeState,
      setTheme: setThemeStateAndDom,
    };
  }, [themeState]);

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

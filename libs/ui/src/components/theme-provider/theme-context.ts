import { createContext, useContext } from 'react';
import { Theme, ThemeContextValue } from './theme-provider.types';
import base from '@famjam/tokens/base';

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const fallback = base as Theme;

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: fallback,
      setTheme: () => {
        console.error('Theme Provider not implemented');
      },
    };
  }
  return context;
};

import base from '@famjam/tokens/base';

export interface Theme {
  theme: ThemeName;
  tokens: ThemeTokens;
}

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface ThemeContextProps {
  theme?: Theme;
  children: React.ReactNode;
}

export type ThemeName = 'base' | 'dark';

export type ThemeTokens = typeof base.tokens;

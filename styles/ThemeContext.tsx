import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { Theme } from './theme.types';
import { DEFAULT_THEME_SLUG } from './themes';

const STORAGE_KEY = 'site-theme';

interface ThemeSwitchContextValue {
  themeName: string;
  setTheme: (slug: string) => void;
  availableThemes: string[];
}

const ThemeSwitchContext = createContext<ThemeSwitchContextValue | null>(null);

interface ThemeContextProviderProps {
  themes: Record<string, Theme>;
  children: React.ReactNode;
}

export const ThemeContextProvider = ({ themes: themeMap, children }: ThemeContextProviderProps) => {
  const [activeSlug, setActiveSlug] = useState(DEFAULT_THEME_SLUG);

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && themeMap[stored]) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for SSR hydration: must read localStorage after mount to avoid server/client mismatch
        setActiveSlug(stored);
      }
    } catch {
      // localStorage unavailable
    }
  }, [themeMap]);

  const setTheme = useCallback(
    (slug: string) => {
      if (!themeMap[slug]) return;
      setActiveSlug(slug);
      try {
        localStorage.setItem(STORAGE_KEY, slug);
      } catch {
        // localStorage unavailable
      }
    },
    [themeMap],
  );

  const availableThemes = useMemo(() => Object.keys(themeMap), [themeMap]);

  const contextValue = useMemo<ThemeSwitchContextValue>(
    () => ({ themeName: activeSlug, setTheme, availableThemes }),
    [activeSlug, setTheme, availableThemes],
  );

  const activeTheme = themeMap[activeSlug] ?? themeMap[DEFAULT_THEME_SLUG]!;

  return (
    <ThemeSwitchContext.Provider value={contextValue}>
      <SCThemeProvider theme={activeTheme}>{children}</SCThemeProvider>
    </ThemeSwitchContext.Provider>
  );
};

export const useThemeSwitch = (): ThemeSwitchContextValue => {
  const ctx = useContext(ThemeSwitchContext);
  if (!ctx) {
    throw new Error('useThemeSwitch must be used within ThemeContextProvider');
  }
  return ctx;
};

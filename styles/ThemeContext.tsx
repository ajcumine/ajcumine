import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';

import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { Theme, ThemeSlug } from './theme.types';
import { DEFAULT_THEME_SLUG, isValidThemeSlug } from './themes';
import { assertNever } from './utils';

const STORAGE_KEY = 'site-theme';

interface ThemeSwitchContextValue {
  themeName: ThemeSlug;
  setTheme: (slug: ThemeSlug) => void;
  availableThemes: ThemeSlug[];
}

const ThemeSwitchContext = createContext<ThemeSwitchContextValue | null>(null);

interface ThemeContextProviderProps {
  themes: Record<ThemeSlug, Theme>;
  children: React.ReactNode;
}

export const ThemeContextProvider = ({ themes: themeMap, children }: ThemeContextProviderProps) => {
  const [activeSlug, setActiveSlug] = useState<ThemeSlug>(DEFAULT_THEME_SLUG);

  // Hydrate theme from localStorage and remove the loading guard.
  // useLayoutEffect runs after DOM mutations but before paint,
  // ensuring the correct theme is active before the user sees anything.
  // This is a one-time hydration effect - intentional setState during mount.
  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useLayoutEffect(() => {
    let nextSlug: ThemeSlug = DEFAULT_THEME_SLUG;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && isValidThemeSlug(stored)) {
        nextSlug = stored;
      }
    } catch {
      // localStorage unavailable
    }

    if (nextSlug !== activeSlug) {
      setActiveSlug(nextSlug);
    }

    // Sync the data-theme attribute and remove the loading guard
    // so the page becomes visible. This always runs even if localStorage fails.
    try {
      document.documentElement.setAttribute('data-theme', nextSlug);
      document.documentElement.removeAttribute('data-theme-loading');
    } catch {
      // DOM unavailable
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  const setTheme = useCallback(
    (slug: ThemeSlug) => {
      if (!themeMap[slug]) return;
      setActiveSlug(slug);
      try {
        localStorage.setItem(STORAGE_KEY, slug);
        document.documentElement.setAttribute('data-theme', slug);
      } catch {
        // localStorage unavailable
      }
    },
    [themeMap],
  );

  const availableThemes = useMemo(() => Object.keys(themeMap) as ThemeSlug[], [themeMap]);

  const contextValue = useMemo<ThemeSwitchContextValue>(
    () => ({ themeName: activeSlug, setTheme, availableThemes }),
    [activeSlug, setTheme, availableThemes],
  );

  const activeTheme = themeMap[activeSlug] ?? themeMap[DEFAULT_THEME_SLUG];

  // Exhaustive check for theme slug
  switch (activeSlug) {
    case 'solarized-dark':
    case 'cyberpunk':
    case 'windows-98':
    case 'geocities':
    case 'bauhaus':
    case 'futurism':
    case 'synthwave':
      break;
    default:
      assertNever(activeSlug);
  }

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

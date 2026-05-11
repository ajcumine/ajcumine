import { Theme, ThemeSlug } from '../theme.types';

import { bauhaus } from './bauhaus';
import { cyberpunk } from './cyberpunk';
import { futurism } from './futurism';
import { geocities } from './geocities';
import { solarizedDark } from './solarized-dark';
import { synthwave } from './synthwave';
import { windows98 } from './windows-98';

export const themes: Record<ThemeSlug, Theme> = {
  bauhaus,
  cyberpunk,
  futurism,
  geocities,
  'solarized-dark': solarizedDark,
  synthwave,
  'windows-98': windows98,
};

export const DEFAULT_THEME_SLUG: ThemeSlug = 'solarized-dark';

export const themeList: Array<{ slug: ThemeSlug; name: string }> = Object.values(themes).map(
  (t) => ({
    slug: t.slug,
    name: t.name,
  }),
);

export const isValidThemeSlug = (slug: string): slug is ThemeSlug => {
  return slug in themes;
};

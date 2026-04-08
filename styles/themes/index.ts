import { Theme } from '../theme.types';

import { bauhaus } from './bauhaus';
import { cyberpunk } from './cyberpunk';
import { futurism } from './futurism';
import { geocities } from './geocities';
import { solarizedDark } from './solarized-dark';
import { synthwave } from './synthwave';
import { windows98 } from './windows-98';

export const themes: Record<string, Theme> = {
  bauhaus,
  cyberpunk,
  futurism,
  geocities,
  'solarized-dark': solarizedDark,
  synthwave,
  'windows-98': windows98,
};

export const DEFAULT_THEME_SLUG = 'solarized-dark';

export const themeList: Array<{ slug: string; name: string }> = Object.values(themes).map((t) => ({
  slug: t.slug,
  name: t.name,
}));

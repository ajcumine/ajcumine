export interface ThemeBackground {
  page: string;
  card: string;
  cardHover: string;
  code: string;
}

export interface ThemeText {
  primary: string;
  secondary: string;
  heading: string;
  link: string;
  linkHover: string;
  inverse: string;
}

export interface ThemeAccent {
  primary: string; // main accent (yellow in solarized)
  secondary: string; // secondary accent (magenta in solarized)
  highlight: string; // emphasis accent (cyan in solarized)
  danger: string; // destructive actions (red)
  success: string; // positive/progress (green)
  decorative: string; // decorative elements
}

export interface ThemeBorder {
  default: string;
  focus: string;
  decorative: string;
  radius: string;
}

export interface ThemeUi {
  navBg: string;
  navText: string;
  navLinkActive: string;
  navLinkInactive: string;
  navLinkHoverBorder: string;
  footerBg: string;
  footerText: string;
  footerLink: string;
  footerLinkHidden: string;
}

export interface ThemePalette {
  yellow: string;
  orange: string;
  red: string;
  magenta: string;
  violet: string;
  blue: string;
  cyan: string;
  green: string;
}

export type ThemeSlug =
  | 'solarized-dark'
  | 'cyberpunk'
  | 'windows-98'
  | 'geocities'
  | 'bauhaus'
  | 'futurism'
  | 'synthwave';

export interface ThemeMeta {
  fontFamily: string;
  fontFamilyHeading?: string;
  codeTheme: string;
  decoratorColor: string;
  headingTransform?: string;
  headingLetterSpacing?: string;
  headingFontStyle?: string;
  hasMascot?: boolean;
}

export interface Theme {
  name: string;
  slug: ThemeSlug;
  background: ThemeBackground;
  text: ThemeText;
  accent: ThemeAccent;
  border: ThemeBorder;
  ui: ThemeUi;
  palette: ThemePalette;
  meta: ThemeMeta;
}

import 'styled-components';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}

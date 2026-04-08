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

export interface ThemeMeta {
  fontFamily: string;
  fontFamilyHeading?: string;
  borderStyle: string;
  cardBorderStyle: string;
  cardBoxShadow: string;
  codeTheme: string;
  decoratorColor: string;
  backgroundCss?: string;
  // NEW — per-component CSS injection
  navCss?: string; // Extra CSS for NavBarWrapper
  navLinkCss?: string; // Extra CSS for nav links
  cardCss?: string; // Extra CSS for ContentCard base
  cardHoverCss?: string; // Extra CSS for ContentCard :hover
  footerCss?: string; // Extra CSS for FooterWrapper
  headingCss?: string; // Extra CSS for H1/H2/H3
  bodyCss?: string; // Extra CSS for body text
  decoratorCss?: string; // Extra CSS for TitleDecorator (replaces/augments bar)
  globalCss?: string; // Global CSS (overlays, cursors, selection, keyframes)
  // NEW — typography control
  headingTransform?: string; // text-transform value
  headingLetterSpacing?: string; // letter-spacing value
  headingFontStyle?: string; // font-style value (normal/italic)
}

export interface Theme {
  name: string;
  slug: string;
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

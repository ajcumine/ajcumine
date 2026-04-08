# Codex

## Project Overview

**Name**: ajcumine
**Description**: Personal website with blog, projects, and game walkthrough checklists
**Status**: Active

## Technology Stack

| Layer     | Technology                | Notes                                          |
| --------- | ------------------------- | ---------------------------------------------- |
| Language  | TypeScript 6              | Strict mode with `noUncheckedIndexedAccess`    |
| Framework | Next.js 16 (Pages Router) | React 19                                       |
| Styling   | styled-components 6.1.14  | SSR enabled via next.config.js compiler option |
| Fonts     | Fira Code (default)       | Themes may override with system fonts          |

## Architecture

### Directory Structure

```
pages/           # Next.js pages (Pages Router)
components/      # React components (14 total)
styles/
  theme.types.ts    # Theme interface + DefaultTheme augmentation
  ThemeContext.tsx   # Provider + useThemeSwitch hook
  codeThemes.ts     # Prism theme lookup map
  variables.ts      # Breakpoints only (size export)
  globals.css       # CSS reset + base styles
  themes/
    index.ts           # Theme registry
    solarized-dark.ts  # Default theme
    bauhaus.ts
    futurism.ts
    synthwave.ts
    cyberpunk.ts
    windows-98.ts
    geocities.ts
public/docs/     # Markdown content (blog posts, projects, walkthroughs)
```

### Theme System

- 7 themes: Solarized Dark (default), Bauhaus, Futurism, Synthwave, Cyberpunk, Windows 98, GeoCities
- `Theme` interface with 7 token groups: background, text, accent, border, ui, palette, meta
- styled-components `ThemeProvider` delivers tokens; `DefaultTheme` augmented for full type safety
- `useThemeSwitch()` hook exposes `{ themeName, setTheme, availableThemes }`
- Theme persisted to localStorage key `site-theme`; validated against known slugs on read
- SSR defaults to Solarized Dark; client hydrates stored theme in useEffect (brief FODT accepted)
- ThemeSwitcher dropdown in NavBar with full keyboard navigation and ARIA listbox pattern
- `ThemeGlobalStyles` component (`createGlobalStyle`) injects per-theme global CSS (overlays, cursors, keyframes, selection colors)

### Per-Component CSS Injection

Themes can inject arbitrary CSS into components via optional `ThemeMeta` string tokens:

| Token           | Target Component  | Purpose                                                   |
| --------------- | ----------------- | --------------------------------------------------------- |
| `backgroundCss` | Page Wrapper      | Page background patterns (gradients, textures)            |
| `navCss`        | NavBarWrapper     | Nav structural changes (borders, transforms, layout)      |
| `navLinkCss`    | StyledNavLink     | Link styling (pseudo-elements, hover overrides)           |
| `cardCss`       | CardLink          | Card structure (clip-path, borders, pseudo-elements)      |
| `cardHoverCss`  | CardLink:hover    | Hover effects (glitch, press, glow)                       |
| `footerCss`     | FooterWrapper     | Footer structure (pseudo-content, borders)                |
| `headingCss`    | H1/H2/H3          | Heading effects (text-shadow, weight)                     |
| `bodyCss`       | Body text         | Body text overrides                                       |
| `decoratorCss`  | TitleDecorator    | Decorator replacement (bars, slashes, cursors, gradients) |
| `globalCss`     | createGlobalStyle | Overlays, cursors, selection, keyframes                   |

Additional typography tokens: `headingTransform`, `headingLetterSpacing`, `headingFontStyle`

### Adding a New Theme

1. Create `styles/themes/my-theme.ts` implementing the `Theme` interface
2. Import and register in `styles/themes/index.ts`
3. If the theme needs a non-system Google Font, add the import to `styles/globals.css`
4. Populate CSS injection tokens for visual personality (see existing themes for examples)
5. If adding animations, define `@keyframes` in `globalCss` and reference in component tokens
6. Ensure `body::after` overlays include `pointer-events: none` and `z-index: 9999`

## Conventions

- **Formatting**: Prettier (run `pnpm format`)
- **Linting**: ESLint — no console, import/order (grouped + alphabetized, React first), self-closing components, PascalCase JSX
- **Naming**: styled-components transient props use `$` prefix (e.g., `$active`, `$open`)
- **Units**: rem with 10px base (`html { font-size: 10px }`)
- **Theme tokens**: All components use `${({ theme }) => theme.X.Y}` — never import colors directly

## Key Decisions

| Date       | Decision                                                                      | Rationale                                                                                                                               |
| ---------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-08 | styled-components ThemeProvider over CSS custom properties                    | Type-safe access in template literals, avoids double-system complexity, supports non-color tokens (fonts, border styles) natively       |
| 2026-04-08 | Accept brief flash-of-default-theme on SSR                                    | Simpler than blocking script in \_document.tsx; flash is sub-100ms; upgrade path documented                                             |
| 2026-04-08 | Theme tokens include meta properties (fontFamily, borderStyle, cardBoxShadow) | Enables themes to feel genuinely different beyond color swaps (Win98 beveled borders, GeoCities dashed borders, Bauhaus offset shadows) |
| 2026-04-08 | All Prism code blocks use a11yDark                                            | Single code theme works acceptably across all 7 themes; registry exists for future per-theme code themes                                |
| 2026-04-08 | Light themes (Bauhaus, Win98) use oneLight/vs Prism themes                    | a11yDark renders light tokens invisible on light code backgrounds                                                                       |
| 2026-04-08 | Per-component CSS injection via raw string tokens                             | Most flexible approach for theme-specific structural changes without needing a token for every CSS property                             |
| 2026-04-08 | ThemeGlobalStyles for global CSS (overlays, cursors, keyframes)               | createGlobalStyle with theme access; complements globals.css; prefers-reduced-motion guard included                                     |

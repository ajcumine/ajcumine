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

### Theme System Architecture (Post-ADR-0001)

**Hybrid: Layout Shells + Per-Component Variants**

Themes are no longer raw CSS string injectors. The architecture has three layers:

1. **Theme Tokens** — Pure data (colors, fonts, border styles, radii). Lives in `styles/themes/*.ts`. No raw CSS strings in `meta`.
2. **Per-Component `.variants.ts` files** — CSS-only theme differences extracted into `Record<ThemeSlug, css>` mappings. Each component that needs theme-specific styling has a `variants.ts` file alongside it. Main component files stay clean.
3. **Theme Layout Shells** — React-level overrides for themes that need component mounting, state management, or input handling. A theme provides a `Layout.tsx` that replaces the default page structure.

`ThemeSlug` is a TypeScript union (`'solarized-dark' | 'cyberpunk' | 'windows-98' | 'geocities' | 'bauhaus' | 'futurism'`). All switches over `ThemeSlug` are exhaustive with `assertNever()`.

### Adding a New Theme

1. Create `styles/themes/my-theme.ts` with tokens only (no CSS injection strings)
2. Import and register in `styles/themes/index.ts`
3. Add the slug to the `ThemeSlug` union in `styles/theme.types.ts`
4. Add variants to each component's `.variants.ts` file (TypeScript will error until exhaustive)
5. If the theme needs React-level overrides, create `styles/themes/my-theme/Layout.tsx`
6. Register the Layout in `components/Page.tsx` switch statement
7. Document the theme in `THEMES.md`

## Conventions

- **Formatting**: Prettier (run `pnpm format`)
- **Linting**: ESLint — no console, import/order (grouped + alphabetized, React first), self-closing components, PascalCase JSX
- **Naming**: styled-components transient props use `$` prefix (e.g., `$active`, `$open`)
- **Units**: rem with 10px base (`html { font-size: 10px }`)
- **Theme tokens**: All components use `${({ theme }) => theme.X.Y}` — never import colors directly
- **Animation keyframes exception**: `@keyframes` and global pseudo-element overlays (e.g., `body::after` scanlines) in `.variants.ts` and `globalVariants.ts` may use hardcoded hex/rgba values because styled-components keyframes and global rules do not inherit dynamic theme context. All other CSS must use theme tokens.

## Key Decisions

| Date       | Decision                                                                      | Rationale                                                                                                                               |
| ---------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-08 | styled-components ThemeProvider over CSS custom properties                    | Type-safe access in template literals, avoids double-system complexity, supports non-color tokens (fonts, border styles) natively       |
| 2026-04-08 | Accept brief flash-of-default-theme on SSR                                    | Simpler than blocking script in \_document.tsx; flash is sub-100ms; upgrade path documented                                             |
| 2026-05-11 | Eliminate theme flash via \_document.tsx inline script + CSS body guard       | Inline script reads localStorage before paint, hides body with opacity:0, useLayoutEffect reveals after theme applied; zero flash guaranteed |
| 2026-05-11 | TypeScript `override` modifier on Document.render()                         | Required by Next.js 16 + strict TypeScript config when overriding base class methods                                                    |
| 2026-04-08 | Theme tokens include meta properties (fontFamily, borderStyle, cardBoxShadow) | Enables themes to feel genuinely different beyond color swaps (Win98 beveled borders, GeoCities dashed borders, Bauhaus offset shadows) |
| 2026-04-08 | All Prism code blocks use a11yDark                                            | Single code theme works acceptably across all 7 themes; registry exists for future per-theme code themes                                |
| 2026-04-08 | Light themes (Bauhaus, Win98) use oneLight/vs Prism themes                    | a11yDark renders light tokens invisible on light code backgrounds                                                                       |
| 2026-04-08 | Per-component CSS injection via raw string tokens                             | Most flexible approach for theme-specific structural changes without needing a token for every CSS property                             |
| 2026-04-08 | ThemeGlobalStyles for global CSS (overlays, cursors, keyframes)               | createGlobalStyle with theme access; complements globals.css; prefers-reduced-motion guard included                                     |
| 2026-04-09 | Clippy component: theme-conditional rendering via `useThemeSwitch()` hook     | Renders only when `themeName === 'windows-98'`; mounted in `_app.tsx` outside page `Component` for cross-page persistence               |
| 2026-04-09 | Clippy speech bubble uses `#ffffe1` (Win98 tooltip yellow) not pure white     | Authentic Win98 tooltip color; matches the era's visual language                                                                        |
| 2026-04-09 | Clippy SVG is inline (not external asset)                                     | Zero network requests; keeps the Easter egg self-contained; simple enough to not warrant a separate file                                |
| 2026-05-11 | Hybrid theme architecture: Layout Shells + per-component `.variants.ts`       | Replaces raw CSS string injection with exhaustive TypeScript switches; supports React-level overrides via Layout Shells; see ADR-0001   |

## Task Routing Log

| Date       | Task Summary                       | Route                                                        | Rationale                                                                                 |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| 2026-05-11 | Theme system architecture refactor | improve-codebase-architecture skill → user grilling → ferrus → fulgrim → lion → ferrus → lion | Complex architectural decision requiring exploration, user alignment, implementation, polish, review, fixes, and final approval |
| 2026-05-11 | Theme flash on refresh fix | council deliberation (5 models) → ferrus → dorn | Council selected inline script + CSS guard approach; validated build and lint pass |

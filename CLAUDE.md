# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # Start dev server
pnpm build     # Production build
pnpm lint      # Run ESLint
pnpm format    # Run Prettier (auto-fix)
```

No test suite exists in this project.

## Architecture

Personal website built with **Next.js (Pages Router)**, **React 19**, **TypeScript**, and **styled-components**.

### Content pattern

Blog posts and project pages are stored as Markdown files in `public/docs/`. Pages use `getStaticProps` to read these files at build time and pass the content string to the `<Markdown>` component for rendering. To add a new post/project page:

1. Create a `.md` file in `public/docs/blog/` or `public/docs/projects/`
2. Create a corresponding page in `pages/blog/` or `pages/projects/` that reads the file via `getStaticProps`

### Key components

- `Page` — routes to a per-theme **Layout Shell** via an exhaustive `ThemeSlug` switch
- `Markdown` — renders markdown string via `react-markdown` with custom styled-component overrides for all heading/paragraph/code/list elements; uses `react-syntax-highlighter` (Prism, a11yDark theme) for code blocks
- `Typography` — base text component with variants (`h1`, `h2`, `h3`, `body`)

### Theme system

Seven switchable themes (Solarized Dark default, Cyberpunk, Windows 98, GeoCities, Bauhaus, Futurism, Synthwave), persisted to localStorage via `styles/ThemeContext.tsx`. Architecture per **ADR-0001** (`docs/adr/`):

- **Tokens**: pure data in `styles/themes/*.ts` (`Theme` interface in `styles/theme.types.ts`)
- **Variants**: per-component `Record<ThemeSlug, css>` maps in `.variants.ts` files alongside components
- **Layout Shells**: per-theme page structure in `components/layouts/`, routed by `components/Page/index.tsx`
- **Theme components**: stateful theme-specific components in `components/themes/<slug>/` (boot sequence, taskbar, outrun scene, etc.)
- **Globals**: overlays/keyframes/cursors in `styles/globalVariants.ts` via `components/ThemeGlobalStyles.tsx`

`THEMES.md` is the behavior manifest — update it when a theme's behavior changes. `CONTEXT.md` defines the domain vocabulary (Theme Variant, Layout Shell, Theme Component). All animation must respect `prefers-reduced-motion` (CSS media query, or `hooks/useReducedMotion.ts` for JS).

### Styling

- `styled-components` with SSR enabled via `next.config.js` compiler option
- Responsive breakpoints (`size`) in `styles/variables.ts`; colors live in the theme system
- Global CSS in `styles/globals.css`; Fira Code is the default site font (per-theme fonts vary)

### Linting / formatting

- ESLint enforces: no `console`, `import/order` (grouped + alphabetized, React first), self-closing components, PascalCase JSX
- Prettier is integrated via `eslint-config-prettier` (no conflicts); run `pnpm format` to auto-fix

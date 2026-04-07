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

- `Page` — shell layout wrapping `NavBar`, `Footer`, and a constrained content column
- `Markdown` — renders markdown string via `react-markdown` with custom styled-component overrides for all heading/paragraph/code/list elements; uses `react-syntax-highlighter` (Prism, a11yDark theme) for code blocks
- `Typography` — base text component with variants (`h1`, `h2`, `h3`, `body`)

### Styling

- `styled-components` with SSR enabled via `next.config.js` compiler option
- Design tokens in `styles/variables.ts`: `color` (Solarized palette) and `size` (responsive breakpoints)
- Global CSS in `styles/globals.css`; Fira Code is the site font

### Linting / formatting

- ESLint enforces: no `console`, `import/order` (grouped + alphabetized, React first), self-closing components, PascalCase JSX
- Prettier is integrated via `eslint-config-prettier` (no conflicts); run `pnpm format` to auto-fix

# Council Session: Theme Flash Fix
**Date:** 2026-05-11
**Members:** councillor-kimi-k26, councillor-haiku-45, councillor-qwen36-plus, councillor-minimax-m25, councillor-gpt51-codex-mini
**Winner:** councillor-kimi-k26 (23 pts)

## Problem
Fix theme flash on page refresh in Next.js + styled-components app. When user selects non-default theme and refreshes, default theme flashes before switching to stored theme.

## Final Solutions

### Solution A — councillor-kimi-k26 (23 pts)
Creates `_document.tsx` with inline script that sets `data-theme` attribute and injects CSS to hide body (`opacity: 0`). Uses `useLayoutEffect` in ThemeContext to read localStorage and remove the loading guard. Keeps `useState(DEFAULT_THEME_SLUG)` for SSR safety. No cookies, preserves static optimization.

**Key files changed:**
- `pages/_document.tsx` - new file with inline script + CSS guard
- `styles/ThemeContext.tsx` - uses useLayoutEffect to hydrate and remove guard

### Solution B — councillor-haiku-45 (10 pts)
Creates `_document.tsx` with inline script setting `data-theme`. ThemeContext initializes from attribute with `getInitialTheme()` function. Uses `useLayoutEffect` to sync. Adds `mounted` state to prevent hydration mismatch by not rendering until mounted. No body hiding/CSS guard.

**Key files changed:**
- `pages/_document.tsx` - new file with inline script
- `context/ThemeContext.tsx` - initializes from data attribute, has mounted guard
- `pages/_app.tsx` - wraps with both ThemeProviders

### Solution C — councillor-qwen36-plus (15 pts)
Creates `_document.tsx` with inline script (validates against VALID_THEMES). ThemeContext initializes from `data-theme` attribute via `getInitialThemeSlug()`. Uses `useEffect` to sync attribute. No body hiding. Clean separation with validation.

**Key files changed:**
- `pages/_document.tsx` - new file with inline script + validation
- `styles/ThemeContext.tsx` - initializes from data attribute

### Solution D — councillor-minimax-m25 (0 pts)
Uses cookies + localStorage hybrid approach. Creates `lib/theme-cookies.ts` with js-cookie library dependency. Uses `getInitialProps` in _app.tsx for server-side cookie detection. More complex with multiple utility files.

**Key files changed:**
- `lib/theme-cookies.ts` - new file with cookie utilities
- `lib/theme-detector.ts` - new file for server-side detection
- `components/ThemeProvider.tsx` - new provider component
- `pages/_app.tsx` - uses getInitialProps
- Adds js-cookie dependency

### Solution E — councillor-gpt51-codex-mini (7 pts)
Creates `styles/theme-utils.ts` with cookie helpers (no external deps). Custom `_document.tsx` with inline script that reads cookie first, then localStorage. Updates `_app.tsx` with `getInitialProps` to read cookie server-side. Enhances ThemeContext to accept `initialThemeSlug` prop. Syncs both cookie and localStorage.

**Key files changed:**
- `styles/theme-utils.ts` - new file with cookie parsing (no library)
- `pages/_document.tsx` - inline script + getInitialProps
- `pages/_app.tsx` - getInitialProps to read cookie
- `styles/ThemeContext.tsx` - accepts initialThemeSlug prop

## Vote Results

| Voter | 1st | 2nd | 3rd | 4th | 5th |
|-------|-----|-----|-----|-----|-----|
| councillor-kimi-k26 | A | C | B | E | D |
| councillor-haiku-45 | A | C | B | E | D |
| councillor-qwen36-plus | A | C | B | E | D |
| councillor-minimax-m25 | A | E | B | C | D |
| councillor-gpt51-codex-mini | C | A | B | E | D |

## Final Scores
| Solution | Model | Points |
|----------|-------|--------|
| A | councillor-kimi-k26 | 23 |
| C | councillor-qwen36-plus | 15 |
| B | councillor-haiku-45 | 10 |
| E | councillor-gpt51-codex-mini | 7 |
| D | councillor-minimax-m25 | 0 |

## Voter Reasoning

### councillor-kimi-k26
Solution A is the best overall because it uses the industry-standard pattern for this exact problem: an inline script in `_document.tsx` paired with a CSS guard (`opacity: 0`) and `useLayoutEffect` to swap the theme before the browser paints. It preserves Next.js Automatic Static Optimization (no `getInitialProps`), avoids hydration mismatch by keeping the server-matching default state initially, and has no external dependencies. The brief body hiding is a better UX tradeoff than a theme flash.

### councillor-haiku-45
Solution A is the clear winner. It solves the core problem elegantly with minimal complexity: The inline script runs before React hydration, setting `data-theme` from localStorage and hiding the body with `opacity: 0`. `useLayoutEffect` (not `useEffect`) ensures the guard is removed synchronously before paint, preventing any flash. Keeps `useState(DEFAULT_THEME_SLUG)` for SSR safety without hydration mismatches. No external dependencies, no cookies, no `getInitialProps` (preserves static optimization). The CSS guard is simple and effective—hiding the body until the theme is applied.

### councillor-qwen36-plus
Solution A wins because it's the only one that **guarantees no flash** through the CSS opacity guard, while keeping the app performant (static optimization preserved). The guard is minimal — the inline script runs synchronously before React hydrates, and `useLayoutEffect` removes it in the same frame as the first paint, so users see the correctly-themed page immediately. The key differentiator is `useLayoutEffect` vs `useEffect`: Solutions using `useEffect` (C) will always flash because the effect runs after paint. Solutions using `getInitialProps` (D, E) solve the problem but at the cost of disabling Next.js static optimization across the entire app — a disproportionate tradeoff for a personal website.

### councillor-minimax-m25
Solution A is the best because it combines two critical techniques: (1) an inline script in `_document.tsx` that runs before paint to set the `data-theme` attribute, and (2) a CSS guard (`opacity: 0` on body) that hides any potential flash. The `useLayoutEffect` in ThemeContext runs synchronously after DOM mutations but before paint, ensuring the theme is applied before the user sees anything. It keeps `useState(DEFAULT_THEME_SLUG)` for SSR safety, avoiding hydration mismatch. No external dependencies, minimal files changed, and clear separation of concerns.

### councillor-gpt51-codex-mini
Solution C strikes the best balance of preventing the flash without a "blank" body‑hide guard, preserves full static optimization, validates the stored theme slug against a whitelist (guarding invalid/edge values), and keeps the code minimal and TypeScript‑friendly. Its inline script + CSS‑variable approach runs before paint, so users never see the wrong theme, and no extra cookie or heavyweight logic is introduced.

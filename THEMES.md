# Theme Behavior Manifest

This document maps where each theme's visual behavior is defined after the ADR-0001 refactor.

## Architecture Overview

Themes are implemented using a **Hybrid: Layout Shells + Per-Component Variants** approach:

1. **Theme tokens remain pure data** — colors, fonts, border styles, radii in `styles/themes/*.ts`
2. **Per-component `.variants.ts` files** — CSS-only theme differences extracted into `Record<ThemeSlug, css>` mappings
3. **Theme Layout Shells** (`components/layouts/*.tsx`) — React-level structure per theme, routed by the `ThemeSlug` switch in `components/Page/index.tsx`
4. **Theme components** (`components/themes/<slug>/`) — stateful, theme-specific components (boot sequences, clocks, scenes) mounted by a shell
5. **`ThemeSlug` is a TypeScript union** — exhaustive switches with `assertNever()`
6. **Global CSS variants** — centralized in `styles/globalVariants.ts` for body::after overlays, cursors, selection colors, and keyframes

Every animated behavior must respect `prefers-reduced-motion`: CSS via media query, JS via `hooks/useReducedMotion.ts`.

Cross-cutting notes:

- **Theme picker chrome is per-theme**: `switcherTriggerVariants` + `switcherDropdownVariants` in `components/ThemeSwitcher/variants.ts`. Windows 98 has no NavBar, so its picker is the **Theme Properties window** (tray icon + Start menu entry).
- **Walkthroughs discoverability**: the footer's gamepad link is a low-opacity ghost (`opacity: 0.15`, full on hover/focus) in every theme with a footer; in Windows 98 it's a desktop shortcut + Start menu entry instead.
- **Selector hygiene in nav variants**: only target the routes list via `> ul` / `> ul > li` — a bare `ul`/`li` selector also matches the ThemeSwitcher dropdown and breaks it.

---

## Solarized Dark — "The IDE"

**Default theme. The site reads as a calibrated code editor.**

| Component          | File                                            | Behavior                                                              |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------------------- |
| **NavBar**         | `components/NavBar/variants.ts`                 | Editor tab strip: darker chrome, full-height tabs, active = open file |
| **Footer**         | `components/Footer/variants.ts`                 | Status bar: branch, encoding, `Ln 1, Col 1`, font                     |
| **ProseContainer** | `components/ProseContainer/variants.ts`         | Line-number gutter (block-level) + current-line hover highlight       |
| **Layout shell**   | `components/layouts/SolarizedLayout.tsx`        | Mounts the minimap                                                    |
| **ScrollMinimap**  | `components/themes/solarized/ScrollMinimap.tsx` | Right-edge scroll rail (rAF-throttled scroll listener)                |
| **ThemeSwitcher**  | `components/ThemeSwitcher/variants.ts`          | Status-chip trigger, quick-open dropdown                              |
| **Global**         | `styles/globalVariants.ts`                      | —                                                                     |

---

## Cyberpunk — "The Terminal Session"

**The site behaves like a live hacking terminal.**

| Component            | File                                               | Behavior                                                           |
| -------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| **Layout shell**     | `components/layouts/CyberpunkLayout.tsx`           | Mounts boot, glitch controller, status line; typewriter title      |
| **BootSequence**     | `components/themes/cyberpunk/BootSequence.tsx`     | Typed boot overlay on theme entry; once per session, skippable     |
| **GlitchController** | `components/themes/cyberpunk/GlitchController.tsx` | Random full-page RGB-split flicker (15–30s), CSS in globalVariants |
| **TypewriterText**   | `components/themes/cyberpunk/TypewriterText.tsx`   | Page title types itself with a block cursor                        |
| **StatusLine**       | `components/themes/cyberpunk/StatusLine.tsx`       | Fixed terminal status bar: uptime + packets tickers                |
| **NavBar**           | `components/NavBar/variants.ts`                    | `andy@ajcumine:~$` prompt, `>` commands, blinking cursor           |
| **Footer**           | `components/Footer/variants.ts`                    | `SYS.OK` badge                                                     |
| **ThemeSwitcher**    | `components/ThemeSwitcher/variants.ts`             | `>` trigger with glow border; black dropdown with green glow       |
| **Page**             | `components/Page/variants.ts`                      | Scanlines + room for the fixed status line                         |
| **ContentCard**      | `components/ContentCard/variants.ts`               | Terminal window header via `attr(data-term-title)`                 |
| **Typography**       | `components/Typography/variants.ts`                | Glitch text-shadow                                                 |
| **TitleDecorator**   | `components/TitleDecorator/variants.ts`            | Blinking cursor block (`▮`)                                        |
| **Global**           | `styles/globalVariants.ts`                         | Crosshair cursor, scanline overlay, `cp-glitch-active` class       |

---

## Windows 98 — "The Desktop OS"

**The site IS a desktop: page content lives in a draggable window.**

| Component           | File                                          | Behavior                                                                        |
| ------------------- | --------------------------------------------- | ------------------------------------------------------------------------------- |
| **Layout shell**    | `components/layouts/Win98Layout.tsx`          | Replaces NavBar+Footer; owns window + theme-window state; Walkthroughs shortcut |
| **DraggableWindow** | `components/themes/win98/DraggableWindow.tsx` | Pointer-drag title bar, minimize/maximize, keyboard nudging (arrows)            |
| **Taskbar**         | `components/themes/win98/Taskbar.tsx`         | Start menu (pages + Theme Properties), task button, tray palette, live clock    |
| **ThemeWindow**     | `components/themes/win98/ThemeWindow.tsx`     | "Theme Properties" picker window (swatch + name rows)                           |
| **Chrome**          | `components/themes/win98/chrome.ts`           | Shared bevels + title-bar styles                                                |
| **ContentCard**     | `components/ContentCard/variants.ts`          | Window chrome with title bar, beveled borders                                   |
| **TitleDecorator**  | `components/TitleDecorator/variants.ts`       | Inset line (gray top, white bottom)                                             |
| **Global**          | `styles/globalVariants.ts`                    | No font smoothing, selection colors                                             |
| **Mascot**          | `components/Clippy.tsx`                       | Enabled via `hasMascot: true`; enlarged, draggable (click vs drag)              |

---

## GeoCities — "The Chaotic Homepage"

**Maximalist 1997 personal homepage energy.**

| Component         | File                                         | Behavior                                                  |
| ----------------- | -------------------------------------------- | --------------------------------------------------------- |
| **Layout shell**  | `components/layouts/GeocitiesLayout.tsx`     | Marquee top, content panel, webring + hit counter, badges |
| **Marquee**       | `components/themes/geocities/Marquee.tsx`    | Seamless scrolling welcome banner                         |
| **HitCounter**    | `components/themes/geocities/HitCounter.tsx` | _Real_ localStorage-incremented odometer counter          |
| **WebringBar**    | `components/themes/geocities/WebringBar.tsx` | Decorative webring (links intentionally dead)             |
| **Badges**        | `components/themes/geocities/Badges.tsx`     | Wobbling UNDER CONSTRUCTION sticker                       |
| **NavBar**        | `components/NavBar/variants.ts`              | 88x31-style buttons, each a clashing gradient             |
| **ThemeSwitcher** | `components/ThemeSwitcher/variants.ts`       | Comic Sans gradient trigger, ridge-bordered navy dropdown |
| **Footer**        | `components/Footer/variants.ts`              | "Best viewed in Netscape" banner                          |
| **Page**          | `components/Page/variants.ts`                | Tiled SVG star-field background                           |
| **CardGrid**      | `components/CardGrid/variants.ts`            | Wobbling `NEW!` sticker on the first card                 |
| **ContentCard**   | `components/ContentCard/variants.ts`         | Ridge borders                                             |
| **Typography**    | `components/Typography/variants.ts`          | Centered headings, magenta shadow                         |
| **Global**        | `styles/globalVariants.ts`                   | Sparkle cursor, rainbow/blink keyframes, `badge-wobble`   |

---

## Bauhaus — "The Poster"

**The page is composed as a Moholy-Nagy/Bayer poster.**

| Component         | File                                   | Behavior                                                                                 |
| ----------------- | -------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Layout shell**  | `components/layouts/BauhausLayout.tsx` | Vertical rotated masthead title; circle/triangle/bar primitives                          |
| **NavBar**        | `components/NavBar/variants.ts`        | Shape glyph markers (● ■ ▲) in the primaries, uppercase Futura links, thick band borders |
| **Page**          | `components/Page/variants.ts`          | Single long diagonal rule                                                                |
| **CardGrid**      | `components/CardGrid/variants.ts`      | CSS-counter numerals bleeding off cards, asymmetric offsets                              |
| **ContentCard**   | `components/ContentCard/variants.ts`   | Thick black border, hard offset shadow                                                   |
| **Typography**    | `components/Typography/variants.ts`    | Heavy 900 weight                                                                         |
| **ThemeSwitcher** | `components/ThemeSwitcher/variants.ts` | Thick black-bordered trigger + dropdown                                                  |
| **Global**        | `styles/globalVariants.ts`             | Disabled transitions (instant, mechanical)                                               |

---

## Futurism — "Speed Made Visible"

**Marinetti: motion lines, racing entrances, words in freedom.**

| Component          | File                                          | Behavior                                                                  |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------------------- |
| **Layout shell**   | `components/layouts/FuturismLayout.tsx`       | Staggered racing entrances for content blocks                             |
| **FuturistHero**   | `components/themes/futurism/FuturistHero.tsx` | _Parole in libertà_ scattered hero (mounted by `InfoPanel`)               |
| **Page**           | `components/Page/variants.ts`                 | Two-velocity animated speed lines over diagonal texture                   |
| **Typography**     | `components/Typography/variants.ts`           | Per-level rotations/skews (`headingVariants` + `h2Variants`/`h3Variants`) |
| **CardGrid**       | `components/CardGrid/variants.ts`             | Escalating skew via `--card-skew` custom property                         |
| **ContentCard**    | `components/ContentCard/variants.ts`          | Consumes `--card-skew`; red left border                                   |
| **Markdown**       | `components/Markdown.variants.ts`             | `>>>` chevron dividers                                                    |
| **TitleDecorator** | `components/TitleDecorator/variants.ts`       | `///` italic marker                                                       |
| **NavBar**         | `components/NavBar/variants.ts`               | Uppercase italic Impact links, speed-streak shadow under the bar          |
| **ThemeSwitcher**  | `components/ThemeSwitcher/variants.ts`        | Skewed red-bordered trigger, skewed dropdown                              |
| **Global**         | `styles/globalVariants.ts`                    | Linear transitions only                                                   |

---

## Synthwave — "The Outrun Scene"

**The classic horizon: striped sun, perspective grid, chrome logos.**

| Component         | File                                          | Behavior                                                           |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| **Layout shell**  | `components/layouts/SynthwaveLayout.tsx`      | Content floats above the fixed scene                               |
| **OutrunScene**   | `components/themes/synthwave/OutrunScene.tsx` | Fixed scene: stars, striped sun, animated perspective grid floor   |
| **VhsOverlay**    | `components/themes/synthwave/VhsOverlay.tsx`  | `PLAY ▶` badge with ticking counter + drifting tracking line       |
| **Typography**    | `components/Typography/variants.ts`           | Chrome gradient headings (`background-clip: text`)                 |
| **NavBar**        | `components/NavBar/variants.ts`               | Neon-tube flicker-on, staggered per link; neon underline on active |
| **ThemeSwitcher** | `components/ThemeSwitcher/variants.ts`        | Pink neon trigger + glowing dropdown                               |
| **Page**          | `components/Page/variants.ts`                 | Transparent — the scene provides the visuals                       |
| **ContentCard**   | `components/ContentCard/variants.ts`          | Pink border glow                                                   |
| **Global**        | `styles/globalVariants.ts`                    | Subtle scanline overlay                                            |

---

## File Reference

### Theme Token Files

- `styles/themes/solarized-dark.ts` / `cyberpunk.ts` / `windows-98.ts` / `geocities.ts` / `bauhaus.ts` / `futurism.ts` / `synthwave.ts`

### Layout Shells

- `components/layouts/DefaultLayout.tsx` — shared chrome (`LayoutWrapper`, `ContentWrapper` also exported for shells)
- `components/layouts/SolarizedLayout.tsx`
- `components/layouts/CyberpunkLayout.tsx`
- `components/layouts/Win98Layout.tsx`
- `components/layouts/GeocitiesLayout.tsx`
- `components/layouts/BauhausLayout.tsx`
- `components/layouts/FuturismLayout.tsx`
- `components/layouts/SynthwaveLayout.tsx`

### Theme Components

- `components/themes/cyberpunk/` — `BootSequence`, `GlitchController`, `TypewriterText`, `StatusLine`
- `components/themes/synthwave/` — `OutrunScene`, `VhsOverlay`
- `components/themes/geocities/` — `Marquee`, `HitCounter`, `WebringBar`, `Badges`
- `components/themes/solarized/` — `ScrollMinimap`
- `components/themes/win98/` — `DraggableWindow`, `Taskbar`, `ThemeWindow`, `chrome`
- `components/themes/futurism/` — `FuturistHero`

### Component Variant Files

- `components/NavBar/variants.ts` — `navBarVariants`, `navLinkVariants`
- `components/Footer/variants.ts` — `footerVariants`
- `components/ContentCard/variants.ts` — `contentCardVariants`, `contentCardHoverVariants`
- `components/Page/variants.ts` — `pageBackgroundVariants`
- `components/Typography/variants.ts` — `headingVariants`, `h2Variants`, `h3Variants`, `bodyVariants`
- `components/TitleDecorator/variants.ts` — `titleDecoratorVariants`
- `components/ThemeSwitcher/variants.ts` — `switcherTriggerVariants`, `switcherDropdownVariants`, `switcherAnimations`
- `components/CardGrid/variants.ts` — `cardGridVariants`
- `components/ProseContainer/variants.ts` — `proseContainerVariants`
- `components/Markdown.variants.ts` — `horizontalRuleVariants`

### Global Files

- `components/ThemeGlobalStyles.tsx` — Global style component for theme-specific CSS
- `styles/ThemeContext.tsx` — React context for theme switching
- `styles/globalVariants.ts` — `globalVariants` (keyframes, cursors, overlays, glitch class)
- `styles/theme.types.ts` — `ThemeSlug` union, `ThemeMeta` interface
- `styles/utils.ts` — `assertNever()` helper
- `hooks/useReducedMotion.ts` — `prefers-reduced-motion` as `useSyncExternalStore` hook

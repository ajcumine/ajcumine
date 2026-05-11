# Theme Behavior Manifest

This document maps where each theme's visual behavior is defined after the ADR-0001 refactor.

## Architecture Overview

Themes are now implemented using a **Hybrid: Layout Shells + Per-Component Variants** approach:

1. **Theme tokens remain pure data** — colors, fonts, border styles, radii in `styles/themes/*.ts`
2. **Per-component `.variants.ts` files** — CSS-only theme differences extracted into `Record<ThemeSlug, css>` mappings
3. **Theme Layout Shells** — React-level overrides for themes that need component mounting, state management, or input handling (via `Page/index.tsx`)
4. **`ThemeSlug` is a TypeScript union** — exhaustive switches with `assertNever()`
5. **Global CSS variants** — centralized in `styles/globalVariants.ts` for body::after overlays, cursors, selection colors, and keyframes

---

## Solarized Dark

**Default theme. No special variants.**

- All components use base styles without theme-specific overrides
- Tokens defined in: `styles/themes/solarized-dark.ts`

---

## Cyberpunk

**Terminal/cyberpunk aesthetic with neon green accents and glitch effects.**

| Component          | File                                    | Behavior                                                        |
| ------------------ | --------------------------------------- | --------------------------------------------------------------- |
| **NavBar**         | `components/NavBar/variants.ts`         | Neon border-bottom, terminal `>` prefix on links, glow effects  |
| **Footer**         | `components/Footer/variants.ts`         | `SYS.OK` prefix badge, top border                               |
| **Page**           | `components/Page/variants.ts`           | Scanline background gradient                                    |
| **ContentCard**    | `components/ContentCard/variants.ts`    | Clip-path angled corners, glitch hover effect                   |
| **Typography**     | `components/Typography/variants.ts`     | Glitch text-shadow (red/cyan offset)                            |
| **TitleDecorator** | `components/TitleDecorator/variants.ts` | Blinking cursor block (`▮`)                                     |
| **Global**         | `styles/globalVariants.ts`              | Crosshair cursor, scanline overlay, selection colors, keyframes |

---

## Windows 98

**Classic Windows 95/98 UI with beveled borders and gray chrome.**

| Component          | File                                    | Behavior                                           |
| ------------------ | --------------------------------------- | -------------------------------------------------- |
| **NavBar**         | `components/NavBar/variants.ts`         | Beveled 3D borders (inset/outset), gray background |
| **Footer**         | `components/Footer/variants.ts`         | Flat gray with top border shadow                   |
| **ContentCard**    | `components/ContentCard/variants.ts`    | Window chrome with title bar, beveled borders      |
| **TitleDecorator** | `components/TitleDecorator/variants.ts` | Inset line (gray top, white bottom)                |
| **Global**         | `styles/globalVariants.ts`              | No font smoothing, selection colors                |
| **Mascot**         | `components/Clippy.tsx`                 | Enabled via `hasMascot: true` in theme meta        |

---

## GeoCities

**1990s web aesthetic with Comic Sans, starfield background, and rainbow effects.**

| Component          | File                                    | Behavior                                                     |
| ------------------ | --------------------------------------- | ------------------------------------------------------------ |
| **NavBar**         | `components/NavBar/variants.ts`         | Centered layout, double yellow borders, starfield background |
| **Footer**         | `components/Footer/variants.ts`         | Visitor counter, "Best viewed in Netscape" banner            |
| **Page**           | `components/Page/variants.ts`           | Starfield background (radial gradients)                      |
| **ContentCard**    | `components/ContentCard/variants.ts`    | Ridge borders, rainbow hover                                 |
| **Typography**     | `components/Typography/variants.ts`     | Centered headings with magenta shadow                        |
| **TitleDecorator** | `components/TitleDecorator/variants.ts` | Rainbow gradient bar                                         |
| **Global**         | `styles/globalVariants.ts`              | Sparkle cursor, rainbow keyframes, selection colors          |

---

## Bauhaus

**Geometric modernist design with primary colors and sharp edges.**

| Component          | File                                    | Behavior                                  |
| ------------------ | --------------------------------------- | ----------------------------------------- |
| **NavBar**         | `components/NavBar/variants.ts`         | Thick black border-bottom                 |
| **Footer**         | `components/Footer/variants.ts`         | Thick black border-top                    |
| **Page**           | `components/Page/variants.ts`           | Geometric accent shapes (red/blue/yellow) |
| **ContentCard**    | `components/ContentCard/variants.ts`    | Thick black border, offset shadow         |
| **Typography**     | `components/Typography/variants.ts`     | Heavy 900 weight                          |
| **TitleDecorator** | `components/TitleDecorator/variants.ts` | Thick red bar                             |
| **Global**         | `styles/globalVariants.ts`              | Disabled transitions (instant)            |

---

## Futurism

**Dynamic diagonal lines and skewed elements suggesting speed and motion.**

| Component          | File                                    | Behavior                                    |
| ------------------ | --------------------------------------- | ------------------------------------------- |
| **NavBar**         | `components/NavBar/variants.ts`         | Skewed container (-3deg), red bottom border |
| **Footer**         | `components/Footer/variants.ts`         | Angled clip-path top edge                   |
| **Page**           | `components/Page/variants.ts`           | Diagonal stripe pattern background          |
| **ContentCard**    | `components/ContentCard/variants.ts`    | Skewed cards (-1deg), red left border       |
| **Typography**     | `components/Typography/variants.ts`     | Heavy 900 weight                            |
| **TitleDecorator** | `components/TitleDecorator/variants.ts` | `///` italic text marker                    |
| **Global**         | `styles/globalVariants.ts`              | Linear transitions only                     |

---

## Synthwave

**Neon glows, grid lines, and sunset gradients.**

| Component          | File                                    | Behavior                                             |
| ------------------ | --------------------------------------- | ---------------------------------------------------- |
| **NavBar**         | `components/NavBar/variants.ts`         | Pink bottom border, glow shadow, gradient background |
| **Footer**         | `components/Footer/variants.ts`         | Pink top border, glow shadow                         |
| **Page**           | `components/Page/variants.ts`           | Grid line background (horizontal + vertical)         |
| **ContentCard**    | `components/ContentCard/variants.ts`    | Pink border glow, inset shadow                       |
| **Typography**     | `components/Typography/variants.ts`     | Pink text-shadow glow                                |
| **TitleDecorator** | `components/TitleDecorator/variants.ts` | White bar with pink glow                             |
| **Global**         | `styles/globalVariants.ts`              | Subtle scanline overlay                              |

---

## File Reference

### Theme Token Files

- `styles/themes/solarized-dark.ts`
- `styles/themes/cyberpunk.ts`
- `styles/themes/windows-98.ts`
- `styles/themes/geocities.ts`
- `styles/themes/bauhaus.ts`
- `styles/themes/futurism.ts`
- `styles/themes/synthwave.ts`

### Component Variant Files

- `components/NavBar/variants.ts` — `navBarVariants`, `navLinkVariants`
- `components/Footer/variants.ts` — `footerVariants`
- `components/ContentCard/variants.ts` — `contentCardVariants`, `contentCardHoverVariants`
- `components/Page/variants.ts` — `pageBackgroundVariants`
- `components/Typography/variants.ts` — `headingVariants`, `bodyVariants`
- `components/TitleDecorator/variants.ts` — `titleDecoratorVariants`
- `components/ThemeSwitcher/variants.ts` — `switcherAnimations`

### Global Files

- `components/ThemeGlobalStyles.tsx` — Global style component for theme-specific CSS
- `styles/ThemeContext.tsx` — React context for theme switching
- `styles/globalVariants.ts` — `globalVariants` (keyframes, cursors, overlays)
- `styles/theme.types.ts` — `ThemeSlug` union, `ThemeMeta` interface
- `styles/utils.ts` — `assertNever()` helper

# Domain Glossary

## Theme

A visual identity for the site. Comprises **tokens** (colors, fonts, border styles) and optionally **behavior** (CSS variants, React component overrides). Each theme has a canonical **slug**.

## Theme Slug

The canonical identifier for a theme. Typed as a TypeScript union (`ThemeSlug`) so all switches are exhaustive at compile time. Examples: `'cyberpunk'`, `'windows-98'`, `'geocities'`.

## Theme Token

Pure data in a theme. Colors, fonts, border styles, radii, box shadows. Behavior-free. Consumed by components via the styled-components `theme` prop.

## Theme Variant

A per-component CSS mapping from `ThemeSlug` to styled-components `css` blocks. Extracted into a `.variants.ts` file alongside the component. Keeps the main component file free of switch logic.

## Theme Layout Shell

A React component that defines the full page structure for a theme. Used when a theme needs React-level overrides — mounting components, managing state, handling input — that CSS alone cannot express. Lives in `components/layouts/`, routed by the `ThemeSlug` switch in `components/Page/index.tsx`. Examples: a desktop OS with taskbar and draggable window, a poster composition with a rotated masthead.

## Theme Component

A stateful, theme-specific React component mounted by a Layout Shell. Lives in `components/themes/<slug>/`. Examples: `BootSequence`, `OutrunScene`, `Taskbar`, `ScrollMinimap`. Purely decorative ones are `aria-hidden` and must respect `prefers-reduced-motion` (via `hooks/useReducedMotion.ts`).

## Default Layout

The standard page structure, defined in `components/layouts/DefaultLayout.tsx`. Comprises `NavBar`, `Footer`, and `ContentWrapper`. Shells that only need extra mounted components compose it; shells with structural chrome compose the exported `LayoutWrapper`/`ContentWrapper` primitives directly. Theme-specific CSS is applied via **theme variants** within each component.

## Exhaustive Switch

A TypeScript `switch` over `ThemeSlug` with a `default` branch that calls `assertNever()`. Guarantees compile-time safety: adding a new theme to the union forces handling in every switch.

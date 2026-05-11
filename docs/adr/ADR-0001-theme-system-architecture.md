# ADR-0001: Theme System Architecture — Hybrid Layout Shells + Per-Component Variants

## Status

Accepted

## Context

The theme system allowed themes to inject raw CSS strings into components via `theme.meta.navCss`, `theme.meta.cardCss`, etc. This created a stringly-typed seam with no validation. Adding a new theme required knowledge of the internal DOM structure of 6+ components. The interface was shallow — nearly as complex as writing CSS directly.

We needed an architecture that:

- Preserves all 6 existing themes without losing visual effects
- Allows adding new themes with bounded maintenance burden
- Supports "truly significant UX changes" (React-level behavior, not just CSS)
- Is testable and AI-navigable

## Decision

Adopt a **hybrid architecture**:

1. **Theme tokens remain pure data** — colors, fonts, border styles, radii. No raw CSS strings in `theme.meta`.
2. **Per-component `.variants.ts` files** handle CSS-only theme differences. Each component that needs theme-specific styling exports a `Record<ThemeSlug, css>` mapping. The main component file stays clean.
3. **Theme Layout Shells** handle React-level overrides. A theme that needs to mount components, manage state, or handle input provides a `Layout.tsx` that replaces the default page structure.
4. **`ThemeSlug` is a TypeScript union** (`'solarized-dark' | 'cyberpunk' | 'windows-98' | 'geocities' | 'bauhaus' | 'futurism'`). All switches over `ThemeSlug` are exhaustive with `assertNever()`.
5. **`THEMES.md` manifest** documents which files define each theme's behavior.

## Consequences

### Positive

- **Locality**: CSS variants for a component live in one file. Layout behavior for a theme lives in one file.
- **Leverage**: Adding a CSS-only theme requires editing `.variants.ts` files — TypeScript forces completeness.
- **Expressiveness**: Layout Shells allow React-level overrides (games, canvas, mascots) without polluting the CSS variant system.
- **Testability**: Each `.variants.ts` file can be tested by asserting the generated CSS strings. Layout Shells are regular React components.
- **AI-navigability**: To understand a theme, read `THEMES.md` first, then the relevant variant/layout files.

### Negative

- Adding a new theme still requires touching N files (one per component with variants). With 6 themes this is acceptable; with 20 it would not be.
- The theme's "personality" is still distributed across the codebase (though centralized in variant files).
- Layout Shells and CSS variants are two different mechanisms — a theme author must know which to use.

## Alternatives Considered

- **Raw CSS injection (current)**: Rejected — stringly-typed, untestable, shallow interface.
- **Centralized Theme Engine (Branch B)**: Rejected — all behavior in one file becomes unwieldy; React-level overrides are awkward.
- **Pure Layout Shells (no variants)**: Rejected — overkill for themes that only need CSS tweaks; would require 6 Layout files for minor changes.
- **Component-level switch cases inline (Branch D)**: Rejected — smears theme identity across every component file; harder to navigate than extracted variants.

## Related

- `CONTEXT.md` — domain glossary for "Theme Variant", "Layout Shell", "Theme Token"
- `THEMES.md` — theme behavior manifest (to be created)

## Amendment 2026-05-11

The `ThemeSlug` union was expanded to include `synthwave`, bringing the total to 7 themes. The architecture remains unchanged.

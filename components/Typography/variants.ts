import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

export const headingVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    font-weight: 700;
    text-shadow:
      0.2rem 0 #ff003c,
      -0.2rem 0 #00fff5;
  `,
  'windows-98': css`
    font-weight: 700;
  `,
  geocities: css`
    text-align: center;
    text-shadow: 0.2rem 0.2rem #ff00ff;
  `,
  bauhaus: css`
    font-weight: 900;
  `,
  futurism: css`
    font-weight: 900;
    transform: rotate(-0.6deg) skewX(-2deg);
    transform-origin: left bottom;
  `,
  synthwave: css`
    // 80s chrome logo treatment
    background: linear-gradient(to bottom, #4a90d9 0%, #ffffff 45%, #ff6ac1 55%, #9b59b6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 0 0.7rem rgba(255, 106, 193, 0.5));

    @media (prefers-reduced-motion: reduce) {
      filter: none;
    }
  `,
};

// parole in libertà: each heading level gets its own angle and energy
export const h2Variants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css``,
  'windows-98': css``,
  geocities: css``,
  bauhaus: css``,
  futurism: css`
    transform: rotate(-1.2deg);
    transform-origin: left bottom;
    font-size: 3.2rem;
  `,
  synthwave: css``,
};

export const h3Variants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css``,
  'windows-98': css``,
  geocities: css``,
  bauhaus: css``,
  futurism: css`
    transform: rotate(0.8deg) skewX(-4deg);
    transform-origin: left bottom;
    font-style: italic;
  `,
  synthwave: css``,
};

export const bodyVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css``,
  'windows-98': css``,
  geocities: css``,
  bauhaus: css``,
  futurism: css``,
  synthwave: css``,
};

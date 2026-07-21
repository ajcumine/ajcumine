import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

export const pageBackgroundVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    background-image: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 2px,
      rgba(0, 255, 65, 0.04) 2px,
      rgba(0, 255, 65, 0.04) 4px
    );
    // room for the fixed terminal StatusLine
    padding-bottom: 2.4rem;
  `,
  'windows-98': css`
    background-image: repeating-conic-gradient(
      rgba(0, 0, 0, 0.05) 0% 25%,
      transparent 25% 50%,
      rgba(0, 0, 0, 0.05) 50% 75%,
      transparent 75% 100%
    );
    background-size: 4px 4px;
  `,
  geocities: css`
    // tiled star field, faithful to the era of repeating background GIFs
    background-color: #000033;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Crect width='140' height='140' fill='%23000033'/%3E%3Ccircle cx='18' cy='26' r='1.6' fill='%23ffffff'/%3E%3Ccircle cx='64' cy='12' r='1' fill='%23ffff00'/%3E%3Ccircle cx='102' cy='40' r='1.8' fill='%2300ffff'/%3E%3Ccircle cx='40' cy='70' r='1.2' fill='%23ff00ff'/%3E%3Ccircle cx='88' cy='96' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='126' cy='118' r='1' fill='%23ffff00'/%3E%3Ccircle cx='24' cy='120' r='1.7' fill='%2300ffff'/%3E%3Ccircle cx='118' cy='76' r='1' fill='%23ffffff'/%3E%3Ccircle cx='52' cy='104' r='1' fill='%23ffffff'/%3E%3C/svg%3E");
  `,
  bauhaus: css`
    // one long diagonal rule slicing the composition
    background-image: linear-gradient(
      115deg,
      transparent calc(62% - 0.1rem),
      #111111 calc(62% - 0.1rem),
      #111111 calc(62% + 0.1rem),
      transparent calc(62% + 0.1rem)
    );
  `,
  futurism: css`
    // speed lines rushing past at two different velocities,
    // over the static diagonal texture
    background-image:
      repeating-linear-gradient(
        to right,
        transparent 0,
        transparent 9rem,
        rgba(255, 51, 0, 0.1) 9rem,
        rgba(255, 51, 0, 0.1) 9.3rem,
        transparent 9.3rem,
        transparent 27rem
      ),
      repeating-linear-gradient(
        to right,
        transparent 0,
        transparent 15rem,
        rgba(0, 0, 0, 0.12) 15rem,
        rgba(0, 0, 0, 0.12) 15.2rem,
        transparent 15.2rem,
        transparent 45rem
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 20px,
        rgba(0, 0, 0, 0.03) 20px,
        rgba(0, 0, 0, 0.03) 21px,
        transparent 21px,
        transparent 40px,
        rgba(255, 51, 0, 0.03) 40px,
        rgba(255, 51, 0, 0.03) 41px
      );
    animation: futurism-speed 2.5s linear infinite;

    @keyframes futurism-speed {
      from {
        background-position-x: 0, 0, 0;
      }
      to {
        background-position-x: 135rem, 90rem, 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `,
  synthwave: css`
    // the OutrunScene fixed layer provides the visuals
    background-color: transparent;
  `,
};

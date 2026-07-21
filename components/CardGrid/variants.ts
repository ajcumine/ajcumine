import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

export const cardGridVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css``,
  'windows-98': css``,
  geocities: css`
    // NEW! sticker on the freshest card
    > *:first-child {
      position: relative;
      &::after {
        content: 'NEW!';
        position: absolute;
        top: -1.2rem;
        right: -0.8rem;
        padding: 0.2rem 0.6rem;
        background-color: #ff0000;
        color: #ffff00;
        font-family: 'Comic Sans MS', 'Comic Sans', cursive;
        font-size: 1.2rem;
        font-weight: bold;
        border: 0.2rem outset #ffff00;
        transform: rotate(8deg);
        animation: badge-wobble 1.5s ease-in-out infinite;
        z-index: 1;
      }
    }
  `,
  bauhaus: css`
    counter-reset: card;

    > * {
      counter-increment: card;
      position: relative;
    }

    // asymmetric poster offset
    > *:nth-child(even) {
      top: 2.4rem;
    }

    > *::before {
      content: counter(card, decimal-leading-zero);
      position: absolute;
      top: -2.4rem;
      right: -0.8rem;
      font-family: 'Futura', 'Helvetica Neue', 'Arial', sans-serif;
      font-size: 5.6rem;
      font-weight: 900;
      line-height: 1;
      color: #e03526;
      z-index: 1;
      pointer-events: none;
    }
  `,
  futurism: css`
    > *:nth-child(2) {
      --card-skew: -2deg;
    }
    > *:nth-child(3) {
      --card-skew: -3deg;
    }
    > *:nth-child(4) {
      --card-skew: -4deg;
    }
    > *:nth-child(n + 5) {
      --card-skew: -5deg;
    }
  `,
  synthwave: css``,
};

import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

export const contentCardVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    clip-path: polygon(
      1.2rem 0,
      100% 0,
      100% calc(100% - 1.2rem),
      calc(100% - 1.2rem) 100%,
      0 100%,
      0 1.2rem
    );
    border: none;
    transition: all 0.05s linear;
  `,
  'windows-98': css`
    border: none;
    border-top: 0.2rem solid #ffffff;
    border-left: 0.2rem solid #ffffff;
    border-right: 0.2rem solid #000000;
    border-bottom: 0.2rem solid #000000;
    box-shadow:
      inset -0.1rem -0.1rem 0 #808080,
      inset 0.1rem 0.1rem 0 #dfdfdf;
    border-radius: 0;
    padding-top: 3.6rem;
    position: relative;
    transition: none;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2rem;
      background: linear-gradient(to right, #000080, #1084d0);
      border-bottom: 0.1rem solid #808080;
    }
  `,
  geocities: css`
    border: 0.4rem ridge #ff00ff;
    border-radius: 0;
    box-shadow: none;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(0, 0, 255, 0.05) 10px,
      rgba(0, 0, 255, 0.05) 20px
    );
    transition: none;
  `,
  bauhaus: css`
    border: 0.3rem solid ${({ theme }) => theme.border.default};
    box-shadow: 0.4rem 0.4rem 0 ${({ theme }) => theme.border.default};
    transition: none;
  `,
  futurism: css`
    transform: skewX(-1deg);
    border-left: 0.6rem solid ${({ theme }) => theme.accent.primary};
    transition: all 0.1s linear;
  `,
  synthwave: css`
    border: 0.1rem solid rgba(255, 106, 193, 0.4);
    box-shadow:
      0 0 1rem rgba(255, 106, 193, 0.1),
      inset 0 0 1rem rgba(255, 106, 193, 0.05);
    transition: all 0.3s ease;
  `,
};

export const contentCardHoverVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    transform: translate(0.2rem, -0.1rem);
    filter: drop-shadow(-0.2rem 0 #ff003c) drop-shadow(0.2rem 0 #00fff5);
  `,
  'windows-98': css`
    transform: none;
    border-top: 0.2rem solid #000000;
    border-left: 0.2rem solid #000000;
    border-right: 0.2rem solid #ffffff;
    border-bottom: 0.2rem solid #ffffff;
    box-shadow:
      inset 0.1rem 0.1rem 0 #808080,
      inset -0.1rem -0.1rem 0 #dfdfdf;
    background-color: #c0c0c0;
  `,
  geocities: css`
    transform: none;
    border-color: #00ffff;
    box-shadow: 0 0 0 0.3rem #ff00ff;
    background-color: #000040;
  `,
  bauhaus: css`
    transform: none;
    box-shadow: 0.8rem 0.8rem 0 ${({ theme }) => theme.border.default};
  `,
  futurism: css`
    transform: skewX(-1deg) translateX(0.8rem);
    box-shadow: -0.4rem 0 0 ${({ theme }) => theme.accent.primary};
  `,
  synthwave: css`
    border-color: ${({ theme }) => theme.accent.primary};
    box-shadow:
      0 0 2rem rgba(255, 106, 193, 0.3),
      0 0 4rem rgba(255, 106, 193, 0.1),
      inset 0 0 1.5rem rgba(255, 106, 193, 0.1);
    transform: translateY(-0.2rem);
  `,
};

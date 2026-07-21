import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

// Per-theme chrome for the trigger button (the palette chip in the NavBar)
export const switcherTriggerVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css`
    background-color: #073642;
    border: 0.1rem solid #b58900;
    color: #b58900;
    border-radius: 0.4rem;

    &:hover {
      background-color: #0b4453;
    }
  `,
  cyberpunk: css`
    background-color: #0a0a0a;
    border: 0.1rem solid #00ff41;
    border-radius: 0;
    color: #00ff41;
    box-shadow: 0 0 0.5rem rgba(0, 255, 65, 0.25);

    &::before {
      content: '> ';
    }

    &:hover {
      background-color: rgba(0, 255, 65, 0.1);
      text-shadow: 0 0 0.5rem #00ff41;
    }
  `,
  'windows-98': css`
    background-color: #c0c0c0;
    color: #000000;
    border-radius: 0;
    border-top: 0.2rem solid #ffffff;
    border-left: 0.2rem solid #ffffff;
    border-right: 0.2rem solid #000000;
    border-bottom: 0.2rem solid #000000;

    &:hover {
      background-color: #c0c0c0;
    }

    &:active {
      border-color: #000000 #ffffff #ffffff #000000;
    }
  `,
  geocities: css`
    background: linear-gradient(to bottom, #ffff00, #ff8800);
    color: #000000;
    font-family: 'Comic Sans MS', 'Comic Sans', cursive;
    font-weight: bold;
    border: 0.3rem outset #c0c0c0;
    border-radius: 0;

    &:hover {
      filter: brightness(1.2);
    }
  `,
  bauhaus: css`
    background-color: #f4f4f0;
    color: #111111;
    border: 0.3rem solid #111111;
    border-radius: 0;
    font-weight: 900;
    text-transform: uppercase;

    &:hover {
      background-color: #e03526;
      color: #f4f4f0;
    }
  `,
  futurism: css`
    background-color: #ffffff;
    color: #111111;
    border: 0.2rem solid #ff3300;
    border-radius: 0;
    font-style: italic;
    font-weight: 700;
    text-transform: uppercase;
    transform: skewX(-3deg);

    &:hover {
      background-color: #ff3300;
      color: #ffffff;
    }
  `,
  synthwave: css`
    background-color: #12122a;
    color: #ff6ac1;
    border: 0.1rem solid #ff6ac1;
    border-radius: 0.4rem;
    box-shadow: 0 0 0.8rem rgba(255, 106, 193, 0.3);
    text-shadow: 0 0 0.4rem currentColor;

    &:hover {
      box-shadow: 0 0 1.6rem rgba(255, 106, 193, 0.5);
    }
  `,
};

// Per-theme chrome for the dropdown panel itself
export const switcherDropdownVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css`
    background-color: #002b36;
    border: 0.1rem solid #073642;
    border-radius: 0.4rem;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
  `,
  cyberpunk: css`
    background-color: #0a0a0a;
    border: 0.1rem solid #00ff41;
    border-radius: 0;
    box-shadow: 0 0 1.5rem rgba(0, 255, 65, 0.2);
  `,
  'windows-98': css`
    background-color: #c0c0c0;
    border: none;
    border-radius: 0;
    border-top: 0.2rem solid #ffffff;
    border-left: 0.2rem solid #ffffff;
    border-right: 0.2rem solid #000000;
    border-bottom: 0.2rem solid #000000;
    box-shadow: 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.3);
  `,
  geocities: css`
    background-color: #000080;
    border: 0.4rem ridge #ff00ff;
    border-radius: 0;
  `,
  bauhaus: css`
    background-color: #ffffff;
    border: 0.3rem solid #111111;
    border-radius: 0;
    box-shadow: 0.6rem 0.6rem 0 #111111;
  `,
  futurism: css`
    background-color: #ffffff;
    border: none;
    border-left: 0.6rem solid #ff3300;
    border-radius: 0;
    transform: skewX(-1deg);
    box-shadow: -0.4rem 0 0 rgba(255, 51, 0, 0.3);
  `,
  synthwave: css`
    background-color: #12122a;
    border: 0.1rem solid rgba(255, 106, 193, 0.6);
    border-radius: 0.4rem;
    box-shadow:
      0 0 1.5rem rgba(255, 106, 193, 0.3),
      0 0 3rem rgba(255, 106, 193, 0.12);
  `,
};

export const switcherAnimations: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css`
    @keyframes sd-pulse {
      0%,
      100% {
        border-left-color: transparent;
      }
      50% {
        border-left-color: #b58900;
      }
    }
    animation: sd-pulse 3s ease-in-out infinite;
  `,
  cyberpunk: css`
    @keyframes cp-glitch {
      0%,
      92%,
      100% {
        transform: none;
        text-shadow: none;
      }
      93% {
        transform: translateX(-0.2rem);
        text-shadow:
          0.2rem 0 #ff003c,
          -0.2rem 0 #00fff5;
      }
      95% {
        transform: translateX(0.2rem);
        text-shadow:
          -0.2rem 0 #ff003c,
          0.2rem 0 #00fff5;
      }
      97% {
        transform: translateX(0);
        text-shadow: none;
      }
    }
    animation: cp-glitch 4s linear infinite;
  `,
  synthwave: css`
    @keyframes sw-glow {
      0%,
      100% {
        text-shadow: 0 0 0.4rem rgba(255, 106, 193, 0.3);
      }
      50% {
        text-shadow:
          0 0 1rem rgba(255, 106, 193, 0.8),
          0 0 2rem rgba(255, 106, 193, 0.4);
      }
    }
    animation: sw-glow 3s ease-in-out infinite;
  `,
  // bauhaus: no animation — stillness and geometric precision
  bauhaus: css``,
  futurism: css`
    @keyframes fu-skew {
      0%,
      100% {
        transform: skewX(0deg);
      }
      50% {
        transform: skewX(-2deg);
      }
    }
    animation: fu-skew 2s ease-in-out infinite;
  `,
  geocities: css`
    @keyframes gc-rainbow {
      0% {
        color: #ff0000;
      }
      16% {
        color: #ff8800;
      }
      33% {
        color: #ffff00;
      }
      50% {
        color: #00ff00;
      }
      66% {
        color: #0000ff;
      }
      83% {
        color: #ff00ff;
      }
      100% {
        color: #ff0000;
      }
    }
    animation: gc-rainbow 3s linear infinite;
  `,
  'windows-98': css`
    @keyframes w98-load {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }
    animation: w98-load 2s ease-in-out infinite;
  `,
};

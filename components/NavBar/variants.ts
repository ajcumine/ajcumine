import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

interface NavLinkStyleProps {
  $active?: boolean;
}

export const navBarVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css`
    /* editor tab strip: darker chrome, tabs flush to the bottom edge */
    height: 4.8rem;
    padding: 0 1.6rem;
    align-items: stretch;
    background-color: #073642;
    border-bottom: 0.1rem solid #002b36;

    /* scoped to the routes list ONLY — a bare ul selector here would also
       match the ThemeSwitcher dropdown and break its layout */
    > ul {
      display: flex;
      align-items: stretch;
    }

    > ul > li {
      margin-right: 0;
      display: flex;
    }

    /* keep the theme switcher vertically centred in the strip */
    > div {
      align-self: center;
    }
  `,
  cyberpunk: css`
    border-bottom: 0.1rem solid ${({ theme }) => theme.accent.primary};
    box-shadow: 0 0.1rem 0.5rem rgba(0, 255, 65, 0.2);
    font-variant-ligatures: none;

    /* shell prompt before the commands */
    > ul::before {
      content: 'andy@ajcumine:~$';
      color: ${({ theme }) => theme.accent.primary};
      opacity: 0.55;
      margin-right: 1.6rem;
      white-space: nowrap;
    }

    /* blinking cursor after the commands */
    > ul::after {
      content: '▮';
      color: ${({ theme }) => theme.accent.primary};
      margin-left: 0.8rem;
      animation: blink-cursor 1s step-end infinite;
    }
  `,
  'windows-98': css`
    background-color: #c0c0c0;
    border-bottom: none;
    border-top: 0.2rem solid #ffffff;
    border-left: 0.2rem solid #ffffff;
    border-right: 0.2rem solid #808080;
    box-shadow: inset -0.1rem -0.1rem 0 #000000;
    color: #000000;
  `,
  geocities: css`
    justify-content: center;
    flex-wrap: wrap;
    border-bottom: 0.3rem double #ffff00;
    border-top: 0.3rem double #ffff00;
    height: auto;
    padding: 1.2rem;
    background: #000080;
    background-image: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 4px,
      rgba(255, 255, 255, 0.03) 4px,
      rgba(255, 255, 255, 0.03) 8px
    );

    // each nav button gets its own clashing gradient
    > ul > li:nth-child(1) a {
      background: linear-gradient(to bottom, #ff00ff, #9900ff);
    }
    > ul > li:nth-child(2) a {
      background: linear-gradient(to bottom, #00ff00, #009900);
    }
    > ul > li:nth-child(3) a {
      background: linear-gradient(to bottom, #ff6600, #ff0000);
    }
    > ul > li:nth-child(4) a {
      background: linear-gradient(to bottom, #00ffff, #0000ff);
    }
  `,
  bauhaus: css`
    border-bottom: 0.4rem solid ${({ theme }) => theme.border.default};
    border-top: 0.4rem solid ${({ theme }) => theme.border.default};

    /* geometric markers, one primary colour per link */
    > ul > li:nth-child(1) a::before {
      content: '●';
      color: #e03526;
      margin-right: 0.6rem;
    }
    > ul > li:nth-child(2) a::before {
      content: '■';
      color: #005b9f;
      margin-right: 0.6rem;
    }
    > ul > li:nth-child(3) a::before {
      content: '▲';
      color: #ffd519;
      margin-right: 0.6rem;
    }
    > ul > li:nth-child(4) a::before {
      content: '●';
      color: #005b9f;
      margin-right: 0.6rem;
    }
  `,
  futurism: css`
    transform: skewX(-3deg);
    border-bottom: 0.3rem solid ${({ theme }) => theme.accent.primary};
    box-shadow:
      0 0.6rem 0 -0.3rem rgba(255, 51, 0, 0.5),
      0 1.2rem 0 -0.6rem rgba(255, 51, 0, 0.25);
  `,
  synthwave: css`
    border-bottom: 0.2rem solid ${({ theme }) => theme.accent.primary};
    box-shadow: 0 0.2rem 1rem rgba(255, 106, 193, 0.3);
    background: linear-gradient(to bottom, #0f0f23 0%, #12122a 100%);

    // neon tubes warming up, staggered per link
    > ul > li:nth-child(1) a {
      animation-delay: 0s;
    }
    > ul > li:nth-child(2) a {
      animation-delay: 0.2s;
    }
    > ul > li:nth-child(3) a {
      animation-delay: 0.45s;
    }
    > ul > li:nth-child(4) a {
      animation-delay: 0.7s;
    }
  `,
};

export const navLinkVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css`
    /* editor tab: the active page is the "open file" */
    display: inline-flex;
    align-items: center;
    height: 4.8rem;
    padding: 0 1.6rem;
    border: none;
    border-right: 0.1rem solid #002b36;
    border-radius: 0;
    font-size: 1.4em;
    color: #586e75;
    background-color: transparent;

    &:hover {
      color: #839496;
      background-color: rgba(0, 43, 54, 0.5);
      border-color: #002b36;
    }

    ${(props) => {
      const { $active } = props as NavLinkStyleProps;
      return (
        $active &&
        css`
          background-color: #002b36;
          color: #b58900;
          box-shadow: inset 0 0.2rem 0 #b58900;

          &:hover {
            color: #b58900;
            background-color: #002b36;
            border-color: #002b36;
          }
        `
      );
    }}
  `,
  cyberpunk: css`
    &::before {
      content: '> ';
      color: ${({ theme }) => theme.accent.primary};
      font-family: 'Fira Code';
      text-shadow: 0 0 0.3rem ${({ theme }) => theme.accent.primary};
    }
    transition: all 0.05s linear;
    &:hover {
      text-shadow: 0 0 0.5rem currentColor;
      background-color: rgba(0, 255, 65, 0.05);
    }
  `,
  'windows-98': css`
    color: #000000;
    padding: 0.2rem 0.8rem;
    border: 0.2rem solid transparent;
    border-bottom: none;
    border-radius: 0;
    transition: none;
    &:hover {
      border-color: #ffffff #808080 #808080 #ffffff;
      border-style: solid;
    }
    &:active {
      border-color: #808080 #ffffff #ffffff #808080;
    }
  `,
  geocities: css`
    // 88x31-style chunky homepage button
    display: inline-block;
    min-width: 8.8rem;
    padding: 0.6rem 1rem;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
    font-size: 1.4em;
    text-decoration: none;
    text-shadow: 0.1rem 0.1rem #000000;
    border: 0.3rem outset #c0c0c0;
    border-radius: 0;

    &:hover {
      color: #ffff00;
      border-style: solid;
      border-color: #ffff00;
      animation: none;
      filter: brightness(1.3);
    }

    &:active {
      border-style: inset;
    }
  `,
  bauhaus: css`
    padding: 0.4rem 0.8rem;
    border-bottom: none;
    border-color: transparent;
    transition: none;
    font-family: 'Futura', 'Helvetica Neue', 'Arial', sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    &:hover {
      background-color: ${({ theme }) => theme.accent.primary};
      color: ${({ theme }) => theme.background.page};
      border-color: transparent;
    }
  `,
  futurism: css`
    display: inline-block;
    transform: skewX(3deg);
    padding: 0.4rem 0.8rem;
    transition: all 0.1s linear;
    font-family: 'Impact', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif;
    font-style: italic;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    &:hover {
      background-color: ${({ theme }) => theme.accent.primary};
      color: ${({ theme }) => theme.text.inverse};
      border-color: ${({ theme }) => theme.accent.primary};
    }
  `,
  synthwave: css`
    transition:
      text-shadow 0.3s ease,
      color 0.3s ease;
    text-shadow: 0 0 0.4rem currentColor;

    @keyframes neon-flicker {
      0%,
      100% {
        opacity: 1;
      }
      3% {
        opacity: 0.3;
      }
      6% {
        opacity: 1;
      }
      9% {
        opacity: 0.5;
      }
      12% {
        opacity: 1;
      }
    }
    animation: neon-flicker 1.1s linear both;

    ${(props) => {
      const { $active } = props as NavLinkStyleProps;
      return (
        $active &&
        css`
          /* neon underline tube under the active link */
          box-shadow: 0 1rem 0.8rem -0.5rem rgba(255, 106, 193, 0.55);
        `
      );
    }}

    &:hover {
      text-shadow:
        0 0 1rem currentColor,
        0 0 2rem currentColor;
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `,
};

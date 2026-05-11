import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

export const navBarVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    border-bottom: 0.1rem solid ${({ theme }) => theme.accent.primary};
    box-shadow: 0 0.1rem 0.5rem rgba(0, 255, 65, 0.2);
    font-variant-ligatures: none;
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
  `,
  bauhaus: css`
    border-bottom: 0.4rem solid ${({ theme }) => theme.border.default};
  `,
  futurism: css`
    transform: skewX(-3deg);
    border-bottom: 0.3rem solid ${({ theme }) => theme.accent.primary};
  `,
  synthwave: css`
    border-bottom: 0.2rem solid ${({ theme }) => theme.accent.primary};
    box-shadow: 0 0.2rem 1rem rgba(255, 106, 193, 0.3);
    background: linear-gradient(to bottom, #0f0f23 0%, #12122a 100%);
  `,
};

export const navLinkVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
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
    text-decoration: underline;
    border: none;
    border-bottom: none;
    font-weight: bold;
    font-size: 1.8em;
    &:hover {
      color: #ff0000;
      border: none;
      border-bottom: none;
      animation: rainbow-shift 2s linear infinite;
    }
  `,
  bauhaus: css`
    padding: 0.4rem 0.8rem;
    border-bottom: none;
    border-color: transparent;
    transition: none;
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
    &:hover {
      text-shadow:
        0 0 1rem currentColor,
        0 0 2rem currentColor;
    }
  `,
};

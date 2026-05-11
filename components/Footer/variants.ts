import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

export const footerVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    border-top: 0.1rem solid rgba(0, 255, 65, 0.3);
    font-variant-ligatures: none;
    &::before {
      content: 'SYS.OK';
      color: ${({ theme }) => theme.accent.primary};
      font-size: 1.2rem;
      font-family: 'Fira Code';
      opacity: 0.5;
      margin-right: 1.2rem;
    }
  `,
  'windows-98': css`
    background-color: #c0c0c0;
    border-top: 0.2rem solid #ffffff;
    box-shadow: inset 0 0.1rem 0 #dfdfdf;
  `,
  geocities: css`
    flex-direction: column;
    height: auto;
    padding: 1.6rem;
    gap: 0.8rem;
    border-top: 0.3rem double #ffff00;
    &::before {
      content: 'Best viewed in Netscape Navigator 4.0 at 800x600';
      font-size: 1rem;
      color: #00ffff;
      font-family: 'Times New Roman', serif;
      text-align: center;
      display: block;
      order: 1;
    }
    &::after {
      content: 'You are visitor #004,721';
      font-size: 1.2rem;
      color: #ffff00;
      font-family: 'Comic Sans MS', cursive;
      text-align: center;
      display: block;
      order: 2;
    }
  `,
  bauhaus: css`
    border-top: 0.4rem solid ${({ theme }) => theme.border.default};
  `,
  futurism: css`
    clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 100%);
    padding-top: 3.2rem;
  `,
  synthwave: css`
    border-top: 0.1rem solid rgba(255, 106, 193, 0.3);
    box-shadow: 0 -0.2rem 1rem rgba(255, 106, 193, 0.15);
  `,
};

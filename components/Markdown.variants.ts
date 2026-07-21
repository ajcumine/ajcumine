import { css } from 'styled-components';

import { ThemeSlug } from '../styles/theme.types';

export const horizontalRuleVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css``,
  'windows-98': css`
    border: none;
    border-top: 0.1rem solid #808080;
    border-bottom: 0.1rem solid #ffffff;
    height: 0;
  `,
  geocities: css`
    height: 0.6rem;
    border: none;
    background: linear-gradient(
      to right,
      #ff0000,
      #ff8800,
      #ffff00,
      #00ff00,
      #0000ff,
      #8800ff,
      #ff0088
    );
  `,
  bauhaus: css`
    height: 0.4rem;
    border: none;
    background-color: #000000;
  `,
  futurism: css`
    border: none;
    height: auto;
    &::before {
      content: '>>> >>> >>>';
      display: block;
      color: ${({ theme }) => theme.accent.primary};
      font-size: 1.6rem;
      font-weight: 900;
      font-style: italic;
      letter-spacing: 0.2em;
    }
  `,
  synthwave: css`
    border-color: rgba(255, 106, 193, 0.5);
    box-shadow: 0 0 0.6rem rgba(255, 106, 193, 0.4);
  `,
};

import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

export const titleDecoratorVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    background-color: transparent;
    height: auto;
    width: auto;
    &::before {
      content: '\25AE';
      color: ${({ theme }) => theme.meta.decoratorColor};
      font-size: 2rem;
      animation: blink-cursor 1s step-end infinite;
    }
  `,
  'windows-98': css`
    height: 0.2rem;
    background: none;
    border-top: 0.1rem solid #808080;
    border-bottom: 0.1rem solid #ffffff;
    width: 100%;
  `,
  geocities: css`
    height: 0.6rem;
    width: 100%;
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
    border-radius: 0;
  `,
  bauhaus: css`
    height: 1.2rem;
    width: 4.8rem;
  `,
  futurism: css`
    background-color: transparent;
    height: auto;
    width: auto;
    &::before {
      content: '///';
      color: ${({ theme }) => theme.meta.decoratorColor};
      font-size: 2rem;
      font-weight: 900;
      font-style: italic;
      letter-spacing: -0.1em;
    }
  `,
  synthwave: css`
    height: 0.2rem;
    background: #ffffff;
    box-shadow:
      0 0 0.5rem ${({ theme }) => theme.accent.primary},
      0 0 1rem rgba(255, 106, 193, 0.5);
    border-radius: 0.1rem;
  `,
};

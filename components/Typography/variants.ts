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
  `,
  synthwave: css`
    text-shadow:
      0 0 0.7rem ${({ theme }) => theme.accent.primary},
      0 0 1.5rem rgba(255, 106, 193, 0.5);
  `,
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

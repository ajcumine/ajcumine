import { createGlobalStyle } from 'styled-components';

import { globalVariants } from '../styles/globalVariants';

export const ThemeGlobalStyles = createGlobalStyle`
  ${({ theme }) => globalVariants[theme.slug]}

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

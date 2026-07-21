import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';
import { size } from '../../styles/variables';

export const proseContainerVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css`
    @media (min-width: ${size.tablet}) {
      // Editor gutter: block-level line numbers + current-line highlight
      counter-reset: line;

      > * {
        counter-increment: line;
        position: relative;
        transition: background-color 150ms ease-in-out;
      }

      > *:hover {
        background-color: rgba(38, 139, 210, 0.08);
      }

      > *::before {
        content: counter(line);
        position: absolute;
        left: -4.4rem;
        width: 3.2rem;
        text-align: right;
        font-size: 1.2rem;
        line-height: inherit;
        color: #586e75;
        opacity: 0.8;
        user-select: none;
      }
    }
  `,
  cyberpunk: css``,
  'windows-98': css``,
  geocities: css``,
  bauhaus: css``,
  futurism: css``,
  synthwave: css``,
};

import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

export const pageBackgroundVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    background-image: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 2px,
      rgba(0, 255, 65, 0.04) 2px,
      rgba(0, 255, 65, 0.04) 4px
    );
  `,
  'windows-98': css`
    background-image: repeating-conic-gradient(
      rgba(0, 0, 0, 0.05) 0% 25%,
      transparent 25% 50%,
      rgba(0, 0, 0, 0.05) 50% 75%,
      transparent 75% 100%
    );
    background-size: 4px 4px;
  `,
  geocities: css`
    background-image:
      radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)),
      radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
      radial-gradient(2px 2px at 90px 40px, #ffff00, rgba(0, 0, 0, 0)),
      radial-gradient(2px 2px at 160px 120px, #00ffff, rgba(0, 0, 0, 0)),
      radial-gradient(1px 1px at 240px 90px, #ff00ff, rgba(0, 0, 0, 0));
    background-size: 300px 300px;
  `,
  bauhaus: css`
    background-image:
      linear-gradient(to right, #e03526 0, #e03526 8px, transparent 8px),
      linear-gradient(to bottom, #005b9f 0, #005b9f 120px, transparent 120px),
      linear-gradient(to left, #ffd519 0, #ffd519 60px, transparent 60px);
    background-position:
      0% 10%,
      100% 0%,
      100% 90%;
    background-repeat: no-repeat;
    background-attachment: fixed;
  `,
  futurism: css`
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 20px,
      rgba(0, 0, 0, 0.03) 20px,
      rgba(0, 0, 0, 0.03) 21px,
      transparent 21px,
      transparent 40px,
      rgba(255, 51, 0, 0.03) 40px,
      rgba(255, 51, 0, 0.03) 41px
    );
  `,
  synthwave: css`
    background-image:
      linear-gradient(to bottom, transparent 60%, rgba(155, 89, 182, 0.15) 100%),
      repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 39px,
        rgba(0, 255, 245, 0.05) 39px,
        rgba(0, 255, 245, 0.05) 40px
      ),
      repeating-linear-gradient(
        to right,
        transparent,
        transparent 39px,
        rgba(255, 106, 193, 0.03) 39px,
        rgba(255, 106, 193, 0.03) 40px
      );
    background-attachment: fixed;
  `,
};

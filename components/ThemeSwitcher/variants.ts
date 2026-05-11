import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

export const switcherAnimations: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css`
    @keyframes sd-pulse {
      0%, 100% { border-left-color: transparent; }
      50% { border-left-color: #b58900; }
    }
    animation: sd-pulse 3s ease-in-out infinite;
  `,
  cyberpunk: css`
    @keyframes cp-glitch {
      0%, 92%, 100% { transform: none; text-shadow: none; }
      93% { transform: translateX(-0.2rem); text-shadow: 0.2rem 0 #ff003c, -0.2rem 0 #00fff5; }
      95% { transform: translateX(0.2rem); text-shadow: -0.2rem 0 #ff003c, 0.2rem 0 #00fff5; }
      97% { transform: translateX(0); text-shadow: none; }
    }
    animation: cp-glitch 4s linear infinite;
  `,
  synthwave: css`
    @keyframes sw-glow {
      0%, 100% { text-shadow: 0 0 0.4rem rgba(255, 106, 193, 0.3); }
      50% { text-shadow: 0 0 1rem rgba(255, 106, 193, 0.8), 0 0 2rem rgba(255, 106, 193, 0.4); }
    }
    animation: sw-glow 3s ease-in-out infinite;
  `,
  // bauhaus: no animation — stillness and geometric precision
  bauhaus: css``,
  futurism: css`
    @keyframes fu-skew {
      0%, 100% { transform: skewX(0deg); }
      50% { transform: skewX(-2deg); }
    }
    animation: fu-skew 2s ease-in-out infinite;
  `,
  geocities: css`
    @keyframes gc-rainbow {
      0% { color: #ff0000; }
      16% { color: #ff8800; }
      33% { color: #ffff00; }
      50% { color: #00ff00; }
      66% { color: #0000ff; }
      83% { color: #ff00ff; }
      100% { color: #ff0000; }
    }
    animation: gc-rainbow 3s linear infinite;
  `,
  'windows-98': css`
    @keyframes w98-load {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    animation: w98-load 2s ease-in-out infinite;
  `,
};

import { css } from 'styled-components';

import { ThemeSlug } from './theme.types';

export const globalVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    body {
      cursor: crosshair;
    }
    a,
    button {
      cursor: crosshair;
    }
    ::selection {
      background-color: #00ff41;
      color: #0d0d0d;
    }
    @keyframes blink-cursor {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }
    @keyframes glitch-shift {
      0%,
      100% {
        transform: translate(0);
      }
      20% {
        transform: translate(-0.2rem, 0.1rem);
      }
      40% {
        transform: translate(0.2rem, -0.1rem);
      }
      60% {
        transform: translate(-0.1rem, -0.1rem);
      }
      80% {
        transform: translate(0.1rem, 0.1rem);
      }
    }
    body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 2px,
        rgba(0, 255, 65, 0.03) 2px,
        rgba(0, 255, 65, 0.03) 4px
      );
    }
    // toggled by GlitchController for a brief full-page RGB-split flicker
    body.cp-glitch-active {
      animation: glitch-shift 0.22s steps(2) both;
      filter: drop-shadow(0.2rem 0 rgba(255, 0, 60, 0.45))
        drop-shadow(-0.2rem 0 rgba(0, 255, 245, 0.45));
    }
  `,
  'windows-98': css`
    body {
      -webkit-font-smoothing: none;
      -moz-osx-font-smoothing: unset;
    }
    ::selection {
      background-color: #000080;
      color: #ffffff;
    }
  `,
  geocities: css`
    @keyframes blink-text {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }
    @keyframes marquee-scroll {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    @keyframes rainbow-shift {
      0% {
        color: #ff0000;
      }
      16% {
        color: #ff8800;
      }
      33% {
        color: #ffff00;
      }
      50% {
        color: #00ff00;
      }
      66% {
        color: #0000ff;
      }
      83% {
        color: #ff00ff;
      }
      100% {
        color: #ff0000;
      }
    }
    @keyframes badge-wobble {
      0%,
      100% {
        transform: rotate(4deg);
      }
      50% {
        transform: rotate(12deg);
      }
    }
    body {
      cursor:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ctext y='20' font-size='20'%3E%E2%9C%A8%3C/text%3E%3C/svg%3E")
          12 12,
        auto;
    }
    ::selection {
      background-color: #ff00ff;
      color: #ffff00;
    }
  `,
  bauhaus: css`
    * {
      transition-duration: 0ms !important;
    }
  `,
  futurism: css`
    * {
      transition-timing-function: linear !important;
      transition-duration: 0.1s !important;
    }
  `,
  synthwave: css`
    body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
      );
    }
  `,
};

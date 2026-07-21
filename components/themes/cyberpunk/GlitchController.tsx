import { useEffect } from 'react';

import { useReducedMotion } from '../../../hooks/useReducedMotion';

const GLITCH_CLASS = 'cp-glitch-active';
const GLITCH_DURATION_MS = 220;
const MIN_DELAY_MS = 15000;
const MAX_DELAY_MS = 30000;

// Periodically flickers the whole page with an RGB-split glitch effect.
// The CSS for the class lives in styles/globalVariants.ts (cyberpunk).
export const GlitchController = () => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let glitchTimer: number;
    let removeTimer: number;

    const scheduleGlitch = () => {
      const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
      glitchTimer = window.setTimeout(() => {
        document.body.classList.add(GLITCH_CLASS);
        removeTimer = window.setTimeout(() => {
          document.body.classList.remove(GLITCH_CLASS);
        }, GLITCH_DURATION_MS);
        scheduleGlitch();
      }, delay);
    };

    scheduleGlitch();

    return () => {
      window.clearTimeout(glitchTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove(GLITCH_CLASS);
    };
  }, [reducedMotion]);

  return null;
};

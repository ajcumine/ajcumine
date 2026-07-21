import React, { useCallback, useEffect, useState } from 'react';

import styled, { keyframes } from 'styled-components';

import { useReducedMotion } from '../../../hooks/useReducedMotion';

const STORAGE_KEY = 'cyberpunk-booted';

const BOOT_LINES = [
  'ESTABLISHING NEURAL LINK... OK',
  'BYPASSING ICE... OK',
  'DECRYPTING CONTENT... OK',
  'RENDERING ajcumine.exe',
];

const LINE_INTERVAL_MS = 350;
const HOLD_MS = 400;
const FADE_MS = 300;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Overlay = styled.div<{ $fading: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background-color: #0d0d0d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2.4rem;
  font-family: 'Fira Code';
  font-size: 1.6rem;
  color: #00ff41;
  cursor: pointer;
  animation: ${({ $fading }) => ($fading ? fadeOut : 'none')} ${FADE_MS}ms linear forwards;

  @media (min-width: 900px) {
    padding: 0 20vw;
  }
`;

const BootLine = styled.div`
  line-height: 2.8rem;
  text-shadow: 0 0 0.4rem rgba(0, 255, 65, 0.6);
  white-space: nowrap;
  overflow: hidden;
`;

const SkipHint = styled.div`
  position: absolute;
  bottom: 2.4rem;
  right: 2.4rem;
  font-size: 1.1rem;
  color: rgba(0, 255, 65, 0.4);
`;

type BootState = 'showing' | 'fading' | 'done';

export const BootSequence = () => {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<BootState | null>(null);
  const [lineCount, setLineCount] = useState(0);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // sessionStorage unavailable
    }
    setState('fading');
    window.setTimeout(() => setState('done'), FADE_MS);
  }, []);

  // Decide on mount whether the boot should play at all
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      let alreadyBooted = false;
      try {
        alreadyBooted = sessionStorage.getItem(STORAGE_KEY) === '1';
      } catch {
        // sessionStorage unavailable
      }
      setState(alreadyBooted || reducedMotion ? 'done' : 'showing');
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  // Reveal lines, then auto-finish
  useEffect(() => {
    if (state !== 'showing') return;

    const interval = window.setInterval(() => {
      setLineCount((count) => {
        if (count >= BOOT_LINES.length) {
          window.clearInterval(interval);
          return count;
        }
        return count + 1;
      });
    }, LINE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (state === 'showing' && lineCount >= BOOT_LINES.length) {
      const timer = window.setTimeout(finish, HOLD_MS);
      return () => window.clearTimeout(timer);
    }
  }, [state, lineCount, finish]);

  // Any keypress skips the boot
  useEffect(() => {
    if (state !== 'showing') return;
    const handleKeyDown = () => finish();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, finish]);

  if (!state || state === 'done') return null;

  return (
    <Overlay $fading={state === 'fading'} onClick={finish} aria-hidden="true">
      {BOOT_LINES.slice(0, lineCount).map((line) => (
        <BootLine key={line}>{line}</BootLine>
      ))}
      <SkipHint>[ click or press any key to skip ]</SkipHint>
    </Overlay>
  );
};

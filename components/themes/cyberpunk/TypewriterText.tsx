import React, { useEffect, useState } from 'react';

import styled, { keyframes } from 'styled-components';

import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Typography } from '../../Typography';

const CHAR_INTERVAL_MS = 70;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 1.2rem;
  height: 0.9em;
  margin-left: 0.4rem;
  background-color: #00ff41;
  vertical-align: baseline;
  animation: ${blink} 1s step-end infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const TypewriterText = ({ text }: { text: string }) => {
  const reducedMotion = useReducedMotion();
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setCharCount((count) => {
        if (count >= text.length) {
          window.clearInterval(interval);
          return count;
        }
        return count + 1;
      });
    }, CHAR_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [text, reducedMotion]);

  // Full text appears instantly when reduced motion is preferred
  const displayCount = reducedMotion ? text.length : charCount;

  return (
    <Typography variant="h1">
      <span aria-label={text}>
        <span aria-hidden="true">{text.slice(0, displayCount)}</span>
        <Cursor aria-hidden="true" />
      </span>
    </Typography>
  );
};

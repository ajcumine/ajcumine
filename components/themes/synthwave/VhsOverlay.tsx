import React, { useEffect, useState } from 'react';

import styled, { keyframes } from 'styled-components';

const trackingDrift = keyframes`
  0% { top: -10%; opacity: 0; }
  5% { opacity: 1; }
  95% { opacity: 1; }
  100% { top: 110%; opacity: 0; }
`;

const PlayBadge = styled.div`
  position: fixed;
  top: 6.4rem;
  left: 1.6rem;
  z-index: 950;
  font-family: 'Fira Code';
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 0 0.6rem rgba(0, 255, 245, 0.6);
  line-height: 2rem;
  user-select: none;
`;

const TrackingLine = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  height: 0.3rem;
  z-index: 949;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.08), transparent);
  pointer-events: none;
  animation: ${trackingDrift} 9s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    display: none;
  }
`;

const formatCounter = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const VhsOverlay = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <PlayBadge aria-hidden="true">
        PLAY ▶<br />
        SP {formatCounter(seconds)}
      </PlayBadge>
      <TrackingLine aria-hidden="true" />
    </>
  );
};

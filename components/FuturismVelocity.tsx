import React, { useEffect, useRef, useState } from 'react';

import styled, { keyframes } from 'styled-components';

import { useThemeSwitch } from '../styles/ThemeContext';

const FUTURISM_RED = '#ff3300';
const FUTURISM_BLACK = '#000000';

const speedLineMove = keyframes`
  0% {
    transform: translateY(-100vh) translateX(0) rotate(30deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) translateX(-20vw) rotate(30deg);
    opacity: 0;
  }
`;

const SpeedLine = styled.div<{ $delay: number; $duration: number; $left: number }>`
  position: fixed;
  top: 0;
  left: ${({ $left }) => $left}%;
  width: 2px;
  height: 100vh;
  background: ${FUTURISM_BLACK};
  pointer-events: none;
  z-index: -1;
  opacity: calc(var(--scroll-velocity, 0) * 0.4);
  animation: ${speedLineMove} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  transform: rotate(30deg);

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const QuoteContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 50;
  font-family: 'Impact', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif;
  font-size: 0.75rem;
  font-style: italic;
  font-weight: bold;
  text-transform: uppercase;
  color: ${FUTURISM_RED};
  transform: skewX(-5deg);
  max-width: 15rem;
  text-align: right;

  @media (prefers-reduced-motion: reduce) {
    transform: none;
  }
`;

const QUOTES = [
  'SPEED IS THE ONLY TRUTH.',
  'THE STATIC PAGE IS DEAD.',
  'TIME AND SPACE DIED YESTERDAY.',
  'MOTION IS ETERNAL.',
];

const SPEED_LINES = [
  { delay: 0, duration: 3, left: 10 },
  { delay: 0.6, duration: 2.5, left: 30 },
  { delay: 1.2, duration: 3.5, left: 50 },
  { delay: 0.3, duration: 2.8, left: 70 },
  { delay: 0.9, duration: 3.2, left: 90 },
];

export const FuturismVelocity = (): React.ReactElement | null => {
  const { themeName } = useThemeSwitch();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const velocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Quote rotation
  useEffect(() => {
    if (themeName !== 'futurism') return;

    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [themeName]);

  // Scroll velocity tracker
  useEffect(() => {
    if (themeName !== 'futurism') {
      // Clean up CSS property when not in futurism theme
      document.documentElement.style.removeProperty('--scroll-velocity');
      return;
    }

    // Initialize last scroll position
    lastScrollYRef.current = window.scrollY;

    // Define update function inside effect to avoid stale closure issues
    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      // Normalize velocity (50px/frame = max velocity of 1)
      const targetVelocity = Math.min(delta / 50, 1);

      // Exponential decay when not scrolling
      velocityRef.current = velocityRef.current * 0.92 + targetVelocity * 0.08;

      // Update CSS custom property
      document.documentElement.style.setProperty(
        '--scroll-velocity',
        velocityRef.current.toFixed(3),
      );

      rafIdRef.current = requestAnimationFrame(updateVelocity);
    };

    // Start the animation frame loop
    rafIdRef.current = requestAnimationFrame(updateVelocity);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      document.documentElement.style.removeProperty('--scroll-velocity');
    };
  }, [themeName]);

  if (themeName !== 'futurism') {
    return null;
  }

  return (
    <>
      {SPEED_LINES.map((line, index) => (
        <SpeedLine key={index} $delay={line.delay} $duration={line.duration} $left={line.left} />
      ))}
      <QuoteContainer aria-hidden="true">{QUOTES[quoteIndex]}</QuoteContainer>
    </>
  );
};

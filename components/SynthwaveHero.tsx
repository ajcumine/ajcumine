import React, { useEffect, useRef } from 'react';

import styled, { keyframes } from 'styled-components';

import { useThemeSwitch } from '../styles/ThemeContext';

const SYNTH_PINK = '#ff6ac1';
const SYNTH_ORANGE = '#ff9a00';
const SYNTH_CYAN = '#00fff5';
const SYNTH_BG_TOP = '#0d0028';
const SYNTH_BG_MID = '#1a0033';
const SYNTH_BG_BOTTOM = '#2d1b4e';
const SYNTH_MOUNTAIN_1 = '#1a0033';
const SYNTH_MOUNTAIN_2 = '#2d1b4e';

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const gridScroll = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 2rem; }
`;

const Container = styled.div`
  height: 20rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    ${SYNTH_BG_TOP} 0%,
    ${SYNTH_BG_MID} 40%,
    ${SYNTH_BG_BOTTOM} 70%,
    ${SYNTH_BG_MID} 100%
  );
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  pointer-events: none;
`;

const Star = styled.div<{ $x: number; $y: number; $delay: number }>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: ${twinkle} 4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.6;
  }
`;

const Sun = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 10rem;
  height: 5rem;
  background: linear-gradient(to bottom, ${SYNTH_PINK}, ${SYNTH_ORANGE});
  border-radius: 50% 50% 0 0;
  mask-image: repeating-linear-gradient(
    to bottom,
    black 0,
    black 4px,
    transparent 4px,
    transparent 8px
  );
  -webkit-mask-image: repeating-linear-gradient(
    to bottom,
    black 0,
    black 4px,
    transparent 4px,
    transparent 8px
  );
  box-shadow: 0 0 4rem 2rem rgba(255, 106, 193, 0.3);
  transition: transform 0.1s ease-out;
`;

const Mountains = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8rem;
  pointer-events: none;
`;

const Mountain1 = styled.div`
  position: absolute;
  bottom: 0;
  left: -10%;
  width: 60%;
  height: 100%;
  background: ${SYNTH_MOUNTAIN_1};
  clip-path: polygon(0% 100%, 30% 20%, 60% 60%, 100% 100%);
`;

const Mountain2 = styled.div`
  position: absolute;
  bottom: 0;
  right: -10%;
  width: 70%;
  height: 100%;
  background: ${SYNTH_MOUNTAIN_2};
  clip-path: polygon(0% 100%, 40% 40%, 70% 10%, 100% 100%);
`;

const Mountain3 = styled.div`
  position: absolute;
  bottom: 0;
  left: 30%;
  width: 50%;
  height: 80%;
  background: ${SYNTH_MOUNTAIN_1};
  clip-path: polygon(0% 100%, 50% 30%, 100% 100%);
  opacity: 0.8;
`;

const Grid = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) perspective(500px) rotateX(60deg);
  width: 200%;
  height: 10rem;
  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 1.8rem,
      ${SYNTH_CYAN}4d 1.8rem,
      ${SYNTH_CYAN}4d 2rem
    ),
    repeating-linear-gradient(
      to right,
      transparent 0,
      transparent 1.8rem,
      ${SYNTH_CYAN}4d 1.8rem,
      ${SYNTH_CYAN}4d 2rem
    );
  animation: ${gridScroll} 2s linear infinite;
  transform-origin: center bottom;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Generate deterministic star positions
const STAR_POSITIONS = [
  { x: 10, y: 15, delay: 0 },
  { x: 25, y: 8, delay: 0.5 },
  { x: 40, y: 20, delay: 1 },
  { x: 55, y: 12, delay: 1.5 },
  { x: 70, y: 25, delay: 0.3 },
  { x: 85, y: 10, delay: 0.8 },
  { x: 15, y: 35, delay: 1.2 },
  { x: 30, y: 45, delay: 0.2 },
  { x: 50, y: 38, delay: 0.7 },
  { x: 65, y: 50, delay: 1.3 },
  { x: 80, y: 42, delay: 0.4 },
  { x: 5, y: 55, delay: 0.9 },
  { x: 20, y: 28, delay: 1.1 },
  { x: 45, y: 5, delay: 0.6 },
  { x: 60, y: 48, delay: 1.4 },
  { x: 75, y: 18, delay: 0.1 },
  { x: 90, y: 52, delay: 0.95 },
  { x: 35, y: 58, delay: 0.35 },
  { x: 8, y: 22, delay: 1.25 },
  { x: 95, y: 30, delay: 0.65 },
  { x: 12, y: 48, delay: 1.05 },
  { x: 52, y: 28, delay: 0.45 },
  { x: 88, y: 38, delay: 1.15 },
  { x: 3, y: 42, delay: 0.75 },
  { x: 68, y: 8, delay: 0.25 },
  { x: 28, y: 52, delay: 0.85 },
  { x: 48, y: 18, delay: 1.35 },
  { x: 82, y: 22, delay: 0.55 },
  { x: 18, y: 62, delay: 1.45 },
  { x: 58, y: 32, delay: 0.15 },
];

export const SynthwaveHero = (): React.ReactElement | null => {
  const { themeName } = useThemeSwitch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (themeName !== 'synthwave') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;

    if (prefersReducedMotion || !hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      containerRef.current.style.setProperty('--mouse-x', x.toFixed(3));
      containerRef.current.style.setProperty('--mouse-y', y.toFixed(3));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [themeName]);

  if (themeName !== 'synthwave') {
    return null;
  }

  const mouseX = 'var(--mouse-x, 0)';
  const mouseY = 'var(--mouse-y, 0)';

  return (
    <Container ref={containerRef} aria-hidden="true">
      <Stars
        style={{
          transform: `translate(calc(${mouseX} * 1rem), calc(${mouseY} * 0.5rem))`,
        }}
      >
        {STAR_POSITIONS.map((star, index) => (
          <Star key={index} $delay={star.delay} $x={star.x} $y={star.y} />
        ))}
      </Stars>
      <Sun
        style={{
          transform: `translateX(-50%) translate(calc(${mouseX} * 1rem), calc(${mouseY} * 0.5rem))`,
        }}
      />
      <Mountains>
        <Mountain1 />
        <Mountain2 />
        <Mountain3 />
      </Mountains>
      <Grid />
    </Container>
  );
};

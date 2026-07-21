import React from 'react';

import styled, { keyframes } from 'styled-components';

const gridDrive = keyframes`
  from { background-position-y: 0; }
  to { background-position-y: 4rem; }
`;

const Scene = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(to bottom, #0f0f23 0%, #1a0b2e 55%, #2d1b4e 100%);
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 55%;
  background-image:
    radial-gradient(1px 1px at 12% 22%, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(1px 1px at 34% 8%, #00fff5, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 52% 30%, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(1px 1px at 71% 14%, #ff6ac1, rgba(0, 0, 0, 0)),
    radial-gradient(1px 1px at 86% 36%, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 24% 44%, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(1px 1px at 63% 48%, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(1px 1px at 93% 6%, #00fff5, rgba(0, 0, 0, 0));
`;

const Sun = styled.div`
  position: absolute;
  left: 50%;
  bottom: 38%;
  width: 26rem;
  height: 26rem;
  transform: translateX(-50%);
  border-radius: 50%;
  background: linear-gradient(to bottom, #f9e547 0%, #ff9f43 35%, #ff6ac1 70%, #9b59b6 100%);
  overflow: hidden;

  // horizontal gaps eaten out of the lower half of the sun
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 48%;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 0.7rem,
      #2d1b4e 0.7rem,
      #2d1b4e 1rem
    );
  }
`;

const HorizonGlow = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 36%;
  height: 4rem;
  background: linear-gradient(to bottom, transparent, rgba(255, 106, 193, 0.25), transparent);
`;

const GridFloor = styled.div`
  position: absolute;
  left: -50%;
  right: -50%;
  bottom: -10%;
  height: 55%;
  transform: perspective(28rem) rotateX(62deg);
  transform-origin: top center;
  background-image:
    repeating-linear-gradient(
      to bottom,
      rgba(0, 255, 245, 0.35) 0,
      rgba(0, 255, 245, 0.35) 0.2rem,
      transparent 0.2rem,
      transparent 4rem
    ),
    repeating-linear-gradient(
      to right,
      rgba(255, 106, 193, 0.28) 0,
      rgba(255, 106, 193, 0.28) 0.2rem,
      transparent 0.2rem,
      transparent 4rem
    );
  animation: ${gridDrive} 1.2s linear infinite;
  mask-image: linear-gradient(to bottom, transparent, black 35%);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 35%);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// The classic outrun horizon: striped sun setting over an endless
// perspective grid. Content scrolls above it like a flying camera.
export const OutrunScene = () => (
  <Scene aria-hidden="true">
    <Stars />
    <Sun />
    <HorizonGlow />
    <GridFloor />
  </Scene>
);

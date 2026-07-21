import React from 'react';

import styled, { keyframes } from 'styled-components';

const wobble = keyframes`
  0%, 100% { transform: rotate(-6deg); }
  50% { transform: rotate(4deg); }
`;

const UnderConstruction = styled.div`
  position: fixed;
  bottom: 8rem;
  left: 1.6rem;
  z-index: 950;
  padding: 0.8rem 1.2rem;
  background: repeating-linear-gradient(
    45deg,
    #ffff00 0,
    #ffff00 1.2rem,
    #000000 1.2rem,
    #000000 2.4rem
  );
  border: 0.3rem outset #c0c0c0;
  animation: ${wobble} 2.5s ease-in-out infinite;
  transform-origin: top left;

  span {
    display: block;
    background-color: #000000;
    color: #ffff00;
    font-family: 'Comic Sans MS', 'Comic Sans', cursive;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    padding: 0.4rem 0.8rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Badges = () => (
  <UnderConstruction aria-hidden="true">
    <span>🚧 UNDER CONSTRUCTION 🚧</span>
  </UnderConstruction>
);

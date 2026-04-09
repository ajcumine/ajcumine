import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import { useThemeSwitch } from '../styles/ThemeContext';

const GEO_BLACK = '#000000';
const GEO_GREEN = '#00ff00';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 3rem;
  background: ${GEO_BLACK};
  border-top: 3px solid ${GEO_GREEN};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: 'Comic Sans MS', 'Comic Sans', 'Chalkboard', 'ChalkboardSE', cursive;
  font-size: 0.75rem;
  color: ${GEO_GREEN};
`;

const WebringButton = styled.button`
  background: none;
  border: 2px solid ${GEO_GREEN};
  color: ${GEO_GREEN};
  font-family: inherit;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;

  &:hover {
    background: ${GEO_GREEN};
    color: ${GEO_BLACK};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const SiteName = styled.span`
  min-width: 12rem;
  text-align: center;
`;

const SITE_NAMES = [
  "~xXx_DarkAngel_xXx's Lair",
  "Bobby's Pokemon Page",
  'The ENCYCLOPAEDIA of ENCYCLOPAEDIAS',
  "Jenny's Hamster Fan Club",
  'FREE MIDI COLLECTION!!!',
];

export const GeoCitiesWebring = (): React.ReactElement | null => {
  const { themeName } = useThemeSwitch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? SITE_NAMES.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === SITE_NAMES.length - 1 ? 0 : prev + 1));
  }, []);

  // Reset index when leaving geocities theme
  useEffect(() => {
    if (themeName !== 'geocities') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for theme cleanup: reset state when leaving theme
      setCurrentIndex(0);
    }
  }, [themeName]);

  if (themeName !== 'geocities') {
    return null;
  }

  return (
    <Container>
      <WebringButton onClick={handlePrev}>[ ← Prev ]</WebringButton>
      <SiteName>{SITE_NAMES[currentIndex]}</SiteName>
      <WebringButton onClick={handleNext}>[ Next → ]</WebringButton>
    </Container>
  );
};

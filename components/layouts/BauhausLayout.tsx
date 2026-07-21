import React from 'react';

import styled from 'styled-components';

import { size } from '../../styles/variables';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';

import { LayoutWrapper } from './DefaultLayout';

const PosterWrapper = styled(LayoutWrapper)`
  position: relative;
  overflow-x: clip;
`;

// --- Geometric primitives: circle, triangle, bar ---

const Primitives = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;

const RedCircle = styled.div`
  position: absolute;
  top: 12rem;
  right: -6rem;
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  background-color: #e03526;
`;

const YellowTriangle = styled.div`
  position: absolute;
  bottom: 16rem;
  left: -4rem;
  width: 16rem;
  height: 16rem;
  background-color: #ffd519;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
`;

const BlueBar = styled.div`
  position: absolute;
  top: 40%;
  right: 0;
  width: 3rem;
  height: 24rem;
  background-color: #005b9f;
`;

// --- Poster composition ---

const PosterRow = styled.div`
  flex: 1 0 auto;
  display: flex;
  gap: 2.4rem;
  margin: 0 2.4rem;

  @media (min-width: ${size.tablet}) {
    max-width: 960px;
    margin: 0 auto;
    width: 100%;
    gap: 4rem;
  }
`;

const VerticalTitle = styled.h1`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin: 0;
  font-family: 'Futura', 'Helvetica Neue', 'Arial', sans-serif;
  font-size: clamp(3.2rem, 6vw, 5.6rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  line-height: 1;
  color: #111111;
  user-select: none;
`;

const PosterContent = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  position: relative;
  z-index: 1;
`;

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

// The page is composed as a Bauhaus poster: vertical masthead title,
// primary-colour primitives behind an asymmetric content column.
export const BauhausLayout = ({ children, title }: LayoutProps) => (
  <PosterWrapper>
    <Primitives aria-hidden="true">
      <RedCircle />
      <YellowTriangle />
      <BlueBar />
    </Primitives>
    <NavBar />
    <PosterRow>
      {title && <VerticalTitle>{title}</VerticalTitle>}
      <PosterContent>{children}</PosterContent>
    </PosterRow>
    <Footer />
  </PosterWrapper>
);

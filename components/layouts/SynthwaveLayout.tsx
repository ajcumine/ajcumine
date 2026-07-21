import React from 'react';

import styled from 'styled-components';

import { Footer } from '../Footer';
import { NavBar } from '../NavBar';
import { OutrunScene } from '../themes/synthwave/OutrunScene';
import { VhsOverlay } from '../themes/synthwave/VhsOverlay';
import { TitleDecorator } from '../TitleDecorator';
import { Typography } from '../Typography';

import { ContentWrapper, LayoutWrapper } from './DefaultLayout';

const TitleWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

// Content floats above the fixed outrun scene
const AboveTheHorizon = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

// Slight canopy over the scene so prose stays readable over the sun
const CanopyContent = styled(ContentWrapper)`
  background-color: rgba(15, 15, 35, 0.72);
  backdrop-filter: blur(2px);
  border-radius: 0.8rem;
  padding: 1.6rem 2rem 2.4rem;

  @media (max-width: 899px) {
    padding: 0.8rem 1.2rem 1.6rem;
  }
`;

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const SynthwaveLayout = ({ children, title }: LayoutProps) => (
  <LayoutWrapper>
    <OutrunScene />
    <VhsOverlay />
    <AboveTheHorizon>
      <NavBar />
      <CanopyContent>
        {title && (
          <TitleWrapper>
            <Typography variant="h1">{title}</Typography>
            <TitleDecorator />
          </TitleWrapper>
        )}
        {children}
      </CanopyContent>
      <Footer />
    </AboveTheHorizon>
  </LayoutWrapper>
);

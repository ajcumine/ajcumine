import React from 'react';

import styled, { keyframes } from 'styled-components';

import { Footer } from '../Footer';
import { NavBar } from '../NavBar';
import { TitleDecorator } from '../TitleDecorator';
import { Typography } from '../Typography';

import { ContentWrapper, LayoutWrapper } from './DefaultLayout';

const raceIn = keyframes`
  from {
    transform: translateX(-4rem);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Content races in from the left, staggered block by block
const RacingContent = styled(ContentWrapper)`
  > * {
    animation: ${raceIn} 0.35s linear both;
  }
  > *:nth-child(1) {
    animation-delay: 0s;
  }
  > *:nth-child(2) {
    animation-delay: 0.07s;
  }
  > *:nth-child(3) {
    animation-delay: 0.14s;
  }
  > *:nth-child(4) {
    animation-delay: 0.21s;
  }
  > *:nth-child(5) {
    animation-delay: 0.28s;
  }
  > *:nth-child(n + 6) {
    animation-delay: 0.35s;
  }

  @media (prefers-reduced-motion: reduce) {
    > * {
      animation: none;
    }
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const FuturismLayout = ({ children, title }: LayoutProps) => (
  <LayoutWrapper>
    <NavBar />
    <RacingContent>
      {title && (
        <TitleWrapper>
          <Typography variant="h1">{title}</Typography>
          <TitleDecorator />
        </TitleWrapper>
      )}
      {children}
    </RacingContent>
    <Footer />
  </LayoutWrapper>
);

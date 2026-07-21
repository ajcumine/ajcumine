import React from 'react';

import styled from 'styled-components';

import { Footer } from '../Footer';
import { NavBar } from '../NavBar';
import { Badges } from '../themes/geocities/Badges';
import { HitCounter } from '../themes/geocities/HitCounter';
import { Marquee } from '../themes/geocities/Marquee';
import { WebringBar } from '../themes/geocities/WebringBar';
import { TitleDecorator } from '../TitleDecorator';
import { Typography } from '../Typography';

import { ContentWrapper, LayoutWrapper } from './DefaultLayout';

const TitleWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

// Content sits on a solid "table layout" panel, as nature intended in 1997
const ContentPanel = styled(ContentWrapper)`
  background-color: #000080;
  border: 0.4rem ridge #ff00ff;
  padding: 2rem 2.4rem;
  margin-bottom: 2.4rem;
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  padding: 0 2.4rem 2.4rem;
`;

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const GeocitiesLayout = ({ children, title }: LayoutProps) => (
  <LayoutWrapper>
    <Marquee />
    <NavBar />
    <ContentPanel>
      {title && (
        <TitleWrapper>
          <Typography variant="h1">{title}</Typography>
          <TitleDecorator />
        </TitleWrapper>
      )}
      {children}
    </ContentPanel>
    <BottomRow>
      <WebringBar />
      <HitCounter />
    </BottomRow>
    <Footer />
    <Badges />
  </LayoutWrapper>
);

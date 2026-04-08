import React from 'react';

import styled from 'styled-components';

import { color, size } from '../styles/variables';

import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { TitleDecorator } from './TitleDecorator';
import { Typography } from './Typography';

const Wrapper = styled.div`
  background-color: ${color.dark};
  color: ${color.darkText};
  min-height: 100%;
  font-family: 'Fira Code';
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1 0 auto;
  margin: 0 2.4rem;
  @media (min-width: ${size.tablet}) {
    max-width: 860px;
    margin: 0 auto;
    width: 100%;
  }
  @media (min-width: ${size.desktop}) {
    max-width: 1100px;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

export const Page = ({ children, title }: { children?: React.ReactNode; title?: string }) => (
  <Wrapper>
    <NavBar />
    <ContentWrapper>
      {title && (
        <TitleWrapper>
          <Typography variant="h1">{title}</Typography>
          <TitleDecorator />
        </TitleWrapper>
      )}
      {children}
    </ContentWrapper>
    <Footer />
  </Wrapper>
);

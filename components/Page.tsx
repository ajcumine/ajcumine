import React from 'react';

import styled from 'styled-components';

import { color, size } from '../styles/variables';
import { Footer } from './Footer';
import { NavBar } from './NavBar';

const Wrapper = styled.div`
  background-color: ${color.dark};
  color: ${color.darkText};
  height: 100%;
  font-family: 'Fira Code';
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1 0 auto;
  margin: 0 1.6rem;
  @media (min-width: ${size.tablet}) {
    max-width: 860px;
    margin: 0 auto;
    width: 100%;
  }
  @media (min-width: ${size.desktop}) {
    max-width: 1100px;
  }
`;

export const Page = ({ children }: { children: React.ReactNode }) => (
  <Wrapper>
    <NavBar />
    <ContentWrapper>
      {children}
    </ContentWrapper>
    <Footer />
  </Wrapper>
);


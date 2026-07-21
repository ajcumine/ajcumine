import React from 'react';

import styled from 'styled-components';

import { size } from '../../styles/variables';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';
import { pageBackgroundVariants } from '../Page/variants';
import { TitleDecorator } from '../TitleDecorator';
import { Typography } from '../Typography';

export const LayoutWrapper = styled.div`
  background-color: ${({ theme }) => theme.background.page};
  color: ${({ theme }) => theme.text.primary};
  min-height: 100%;
  font-family: ${({ theme }) => theme.meta.fontFamily};
  display: flex;
  flex-direction: column;
  transition:
    background-color 300ms ease-in-out,
    color 300ms ease-in-out;
  ${({ theme }) => pageBackgroundVariants[theme.slug]}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ContentWrapper = styled.div`
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

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const DefaultLayout = ({ children, title }: LayoutProps) => (
  <LayoutWrapper>
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
  </LayoutWrapper>
);

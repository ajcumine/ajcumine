import React from 'react';

import styled from 'styled-components';

import { Footer } from '../Footer';
import { NavBar } from '../NavBar';
import { BootSequence } from '../themes/cyberpunk/BootSequence';
import { GlitchController } from '../themes/cyberpunk/GlitchController';
import { StatusLine } from '../themes/cyberpunk/StatusLine';
import { TypewriterText } from '../themes/cyberpunk/TypewriterText';

import { ContentWrapper, LayoutWrapper } from './DefaultLayout';

const TitleWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const CyberpunkLayout = ({ children, title }: LayoutProps) => (
  <LayoutWrapper>
    <BootSequence />
    <GlitchController />
    <NavBar />
    <ContentWrapper>
      {title && (
        <TitleWrapper>
          <TypewriterText text={title} />
        </TitleWrapper>
      )}
      {children}
    </ContentWrapper>
    <Footer />
    <StatusLine />
  </LayoutWrapper>
);

import React from 'react';

import { FaGamepad, FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

import { footerVariants } from './variants';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.ui.footerBg};
  color: ${({ theme }) => theme.ui.footerText};
  flex-shrink: 0;
  height: 4.8rem;
  padding: 1.6rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${({ theme }) => footerVariants[theme.slug]}
`;

const LogoLink = styled.a`
  font-size: 2em;
  color: ${({ theme }) => theme.ui.footerLink};
  margin-left: 0.4em;
  margin-bottom: 0;
  border-radius: 0.4rem;

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.border.focus};
    outline-offset: 0.2rem;
  }
`;

const HiddenLink = styled.a`
  font-size: 2em;
  color: ${({ theme }) => theme.ui.footerLinkHidden};
  margin-right: auto;
  margin-bottom: 0;
  border-radius: 0.4rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.ui.footerText};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.border.focus};
    outline-offset: 0.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Footer = () => (
  <FooterWrapper>
    <HiddenLink href="/walkthroughs">
      <FaGamepad />
    </HiddenLink>
    <LogoLink href="https://github.com/ajcumine">
      <FaGithub />
    </LogoLink>
  </FooterWrapper>
);

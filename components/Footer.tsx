import React from 'react';

import { FaGamepad, FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

import { color } from '../styles/variables';

const FooterWrapper = styled.footer`
  background-color: ${color.dark};
  color: ${color.darkText};
  flex-shrink: 0;
  height: 4.8rem;
  padding: 1.6rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LogoLink = styled.a`
  font-size: 2em;
  color: ${color.yellow};
  margin-left: 0.4em;
  margin-bottom: 0;
  border-radius: 0.4rem;

  &:focus-visible {
    outline: 0.2rem solid ${color.blue};
    outline-offset: 0.2rem;
  }
`;

const HiddenLink = styled.a`
  font-size: 2em;
  color: ${color.dark};
  margin-right: auto;
  margin-bottom: 0;
  border-radius: 0.4rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${color.darkText};
  }

  &:focus-visible {
    outline: 0.2rem solid ${color.blue};
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

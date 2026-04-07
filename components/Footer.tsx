import React from 'react';

import { FaGamepad, FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';

import { color } from '../styles/variables';

const FooterWrapper = styled.footer`
  background-color: ${color.dark};
  color: ${color.darkText};
  flex-shrink: 0;
  height: 4.8rem;
  padding: 1.2rem 1.6em;
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
`;

const HiddenLink = styled.a`
  font-size: 2em;
  color: ${color.dark};
  margin-right: auto;
  margin-bottom: 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${color.darkText};
  }
`;

export const Footer = () => (
  <FooterWrapper>
    <HiddenLink href="/walkthroughs">
      <FaGamepad />
    </HiddenLink>
    <LogoLink href="https://twitch.tv/piphop">
      <FaTwitch />
    </LogoLink>
    <LogoLink href="https://twitter.com/ajcumine">
      <FaTwitter />
    </LogoLink>
    <LogoLink href="https://github.com/ajcumine">
      <FaGithub />
    </LogoLink>
  </FooterWrapper>
);

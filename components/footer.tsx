import React from 'react';

import { FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';

import styles from '../styles/variables';

const FooterWrapper = styled.footer`
  background-color: ${styles.color.dark};
  color: ${styles.color.darkText};
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
  color: ${styles.color.yellow};
  margin-left: 0.4em;
  margin-bottom: 0;
`;

const Footer = () => (
  <FooterWrapper>
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

export default Footer;

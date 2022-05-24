import React from 'react';

import styled from 'styled-components';

import Footer from '../components/Footer';
import HeaderImage from '../components/HeaderImage';
import InfoPanel from '../components/InfoPanel';
import Page from '../components/Page';
import styles from '../styles/variables';

const ContentWrapper = styled.div`
  flex: 1 0 auto;
  margin: 0 1.6rem;
  @media (min-width: ${styles.size.tablet}) {
    max-width: 860px;
    margin: 0 auto;
    width: 100%;
  }
  @media (min-width: ${styles.size.desktop}) {
    max-width: 1100px;
  }
`;

const Home = () => (
  <Page>
    <ContentWrapper>
      <HeaderImage />
      <InfoPanel />
    </ContentWrapper>
    <Footer />
  </Page>
);

export default Home;

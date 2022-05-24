import React from 'react';

import styled from 'styled-components';

import { Page } from '../../components/Page';
import { Typography } from '../../components/Typography';
import { size } from '../../styles/variables';

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

const Pokelm = () => (
  <Page>
    <Typography variant='h1'>Pokelm</Typography>
  </Page>
);

export default Pokelm;
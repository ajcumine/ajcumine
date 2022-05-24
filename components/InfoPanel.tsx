import React from 'react';

import styled from 'styled-components';

import { Typography } from './Typography';

const BodyWrapper = styled.div`
  margin-bottom: 0.8rem;
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

export const InfoPanel = () => (
  <>
    <BodyWrapper>
      <Typography variant='body'>@ajcumine</Typography>
    </BodyWrapper>
    <TitleWrapper>
      <Typography variant='h1'>Andy Cumine</Typography>
    </TitleWrapper>
    <Typography variant='h3'>Engineering Manager @ Second Nature</Typography>
  </>
);


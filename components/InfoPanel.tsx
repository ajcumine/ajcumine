import React from 'react';

import styled from 'styled-components';

import { color } from '../styles/variables';
import { Typography } from './Typography';

const BodyWrapper = styled.div`
  margin-bottom: 0.8rem;
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.4rem;
`;
const TitleDecorator = styled.div`
  width: 4rem;
  height: 0.2rem;
  background-color: ${color.yellow};
  border-radius: 0.1rem;
`;

export const InfoPanel = () => (
  <>
    <BodyWrapper>
      <Typography variant='body'>@ajcumine</Typography>
    </BodyWrapper>
    <TitleWrapper>
      <Typography variant='h1'>Andy Cumine</Typography>
      <TitleDecorator/>
    </TitleWrapper>
    <Typography variant='h3'>Engineering Manager @ Second Nature</Typography>
  </>
);


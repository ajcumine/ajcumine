import React from 'react';

import styled from 'styled-components';

import { TitleDecorator } from './TitleDecorator';
import { Typography } from './Typography';

const BodyWrapper = styled.div`
  margin-bottom: 0.8rem;
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.4rem;
`;

export const InfoPanel = () => (
  <>
    <BodyWrapper>
      <Typography variant="body">@ajcumine</Typography>
    </BodyWrapper>
    <TitleWrapper>
      <Typography variant="h1">Andy Cumine</Typography>
      <TitleDecorator />
    </TitleWrapper>
    <Typography variant="h3">Engineering Manager @ Second Nature</Typography>
  </>
);

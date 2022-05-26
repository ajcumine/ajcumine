import React from 'react';

import styled from 'styled-components';

import { Typography } from './Typography';

const BulletListItemWrapper = styled.li`
  margin-bottom: 0.8rem;
`;

export const BulletListItem = ({ children }: {children: React.ReactNode;}) => (
  <BulletListItemWrapper>
    <Typography variant='body'>- {children}</Typography>
  </BulletListItemWrapper>
);

export const BulletList = styled.ul`
  margin-bottom: 1.6rem;
  margin-left: 1.6rem;
`;

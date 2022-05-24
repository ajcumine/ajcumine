import React from 'react';

import styled from 'styled-components';

import { color } from '../styles/variables';

const Wrapper = styled.div`
  background-color: ${color.dark};
  color: ${color.darkText};
  height: 100%;
  font-family: 'Fira Code';
  display: flex;
  flex-direction: column;
`;

export const Page = ({ children }: { children: React.ReactNode }) => (
  <Wrapper>{children}</Wrapper>
);


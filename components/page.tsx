import React from 'react';

import styled from 'styled-components';

import styles from '../styles/variables';

const Wrapper = styled.div`
  background-color: ${styles.color.dark};
  color: ${styles.color.darkText};
  height: 100%;
  font-family: 'Fira Code';
  display: flex;
  flex-direction: column;
`;

const Page = ({ children }: { children: React.ReactNode }) => (
  <Wrapper>{children}</Wrapper>
);

export default Page;

import React from 'react';

import styled from 'styled-components';

import { proseContainerVariants } from './variants';

const ProseWrapper = styled.div`
  width: min(80vw, 768px);
  max-width: 100%;
  margin: 0 auto;

  ${({ theme }) => proseContainerVariants[theme.slug]}
`;

interface ProseContainerProps {
  children: React.ReactNode;
}

export const ProseContainer = ({ children }: ProseContainerProps) => (
  <ProseWrapper>{children}</ProseWrapper>
);

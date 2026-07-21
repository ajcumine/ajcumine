import React from 'react';

import styled from 'styled-components';

import { proseContainerVariants } from './variants';

const ProseWrapper = styled.div`
  max-width: clamp(65ch, 80vw, 768px);
  margin: 0 auto;

  ${({ theme }) => proseContainerVariants[theme.slug]}
`;

interface ProseContainerProps {
  children: React.ReactNode;
}

export const ProseContainer = ({ children }: ProseContainerProps) => (
  <ProseWrapper>{children}</ProseWrapper>
);

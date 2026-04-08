import React from 'react';

import styled from 'styled-components';

const ProseWrapper = styled.div`
  max-width: clamp(65ch, 80vw, 768px);
  margin: 0 auto;
`;

interface ProseContainerProps {
  children: React.ReactNode;
}

export const ProseContainer = ({ children }: ProseContainerProps) => (
  <ProseWrapper>{children}</ProseWrapper>
);

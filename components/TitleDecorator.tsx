import React from 'react';

import styled from 'styled-components';

import { color } from '../styles/variables';

interface TitleDecoratorProps {
  width?: string;
}

const Decorator = styled.div<TitleDecoratorProps>`
  width: ${({ width }) => width || '4rem'};
  height: 0.2rem;
  background-color: ${color.yellow};
  border-radius: 0.1rem;
`;

export const TitleDecorator = ({ width }: TitleDecoratorProps) => <Decorator width={width} />;

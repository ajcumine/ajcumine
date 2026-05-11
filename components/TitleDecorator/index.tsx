import React from 'react';

import styled from 'styled-components';

import { titleDecoratorVariants } from './variants';

interface TitleDecoratorProps {
  width?: string;
}

const Decorator = styled.div<TitleDecoratorProps>`
  width: ${({ width }) => width || '4rem'};
  height: 0.4rem;
  background-color: ${({ theme }) => theme.meta.decoratorColor};
  ${({ theme }) => titleDecoratorVariants[theme.slug]}
`;

export const TitleDecorator = ({ width }: TitleDecoratorProps) => <Decorator width={width} />;

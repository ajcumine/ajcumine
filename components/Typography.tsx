import React from 'react';

import styled from 'styled-components';

import { color } from '../styles/variables';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'secondary';
  children: React.ReactNode;
}

const H1 = styled.h1`
  font-size: 4.4em;
`;

const H2 = styled.h2`
  font-size: 2.8em;
`;

const H3 = styled.h3`
  font-size: 2.4em;
`;

const Body = styled.p`
  font-size: 1.6em;
  line-height: 2.4rem;
`;

const Secondary = styled.p`
  font-size: 1.6em;
  line-height: 2.4rem;
`;

export const Typography = ({ variant, children }: TypographyProps) => {
  switch (variant) {
  case 'h1':
    return <H1>{children}</H1>;
  case 'h2':
    return <H2>{children}</H2>;
  case 'h3':
    return <H3>{children}</H3>;
  case 'body':
    return <Body>{children}</Body>;
  case 'secondary':
    return <Secondary>{children}</Secondary>;

  default:
    return <Body>{children}</Body>;
  }
};

export const AnchorLink = styled.a`
  font-size: 100%;
  color: ${color.yellow};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

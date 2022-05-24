import React from 'react';

import styled from "styled-components";

import { color } from "../styles/variables";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  variant: "h1" | "h2" | "h3" | "body" | "secondary";
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
`;

const Secondary = styled.p`
  font-size: 1.6em;
`;

export const Typography = (props: TypographyProps) => {
  switch (props.variant) {
  case "h1":
    return <H1>{props.children}</H1>;
    break;
  case "h2":
    return <H2>{props.children}</H2>;
    break;
  case "h3":
    return <H3>{props.children}</H3>;
    break;
  case "body":
    return <Body>{props.children}</Body>;
    break;
  case "secondary":
    return <Secondary>{props.children}</Secondary>;
    break;

  default:
    return <Body>{props.children}</Body>;
    break;
  }
};

export const StyledLink = styled.a<{active: boolean}>`
  font-size: 1.6em;
  text-decoration: none;
  color: ${props => props.active ? color.magenta :color.yellow};
  border-bottom: 0.2rem solid;
  border-color: ${props => props.active ? color.magenta : color.dark};
`;

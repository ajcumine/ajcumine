import React from 'react';

import styled from 'styled-components';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'secondary';
  children: React.ReactNode;
}

const H1 = styled.h1`
  font-size: 4.4rem;
  text-transform: ${({ theme }) => theme.meta.headingTransform || 'none'};
  letter-spacing: ${({ theme }) => theme.meta.headingLetterSpacing || 'normal'};
  font-style: ${({ theme }) => theme.meta.headingFontStyle || 'normal'};
  font-family: ${({ theme }) => theme.meta.fontFamilyHeading || theme.meta.fontFamily};
  ${({ theme }) => theme.meta.headingCss || ''}
`;

const H2 = styled.h2`
  font-size: 2.8rem;
  text-transform: ${({ theme }) => theme.meta.headingTransform || 'none'};
  letter-spacing: ${({ theme }) => theme.meta.headingLetterSpacing || 'normal'};
  font-style: ${({ theme }) => theme.meta.headingFontStyle || 'normal'};
  font-family: ${({ theme }) => theme.meta.fontFamilyHeading || theme.meta.fontFamily};
  ${({ theme }) => theme.meta.headingCss || ''}
`;

const H3 = styled.h3`
  font-size: 2.4rem;
  text-transform: ${({ theme }) => theme.meta.headingTransform || 'none'};
  letter-spacing: ${({ theme }) => theme.meta.headingLetterSpacing || 'normal'};
  font-style: ${({ theme }) => theme.meta.headingFontStyle || 'normal'};
  font-family: ${({ theme }) => theme.meta.fontFamilyHeading || theme.meta.fontFamily};
  ${({ theme }) => theme.meta.headingCss || ''}
`;

const Body = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;
  ${({ theme }) => theme.meta.bodyCss || ''}
`;

const Secondary = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.text.secondary};
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
  color: ${({ theme }) => theme.text.link};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

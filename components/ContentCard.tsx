import React from 'react';

import { format } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';

import { TitleDecorator } from './TitleDecorator';
import { Typography } from './Typography';

const CardLink = styled(Link)`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.border.radius};
  min-height: 20rem;
  padding: 1.6rem;
  background-color: ${({ theme }) => theme.background.card};
  color: ${({ theme }) => theme.text.secondary};
  border: ${({ theme }) => theme.meta.cardBorderStyle};
  box-shadow: ${({ theme }) => theme.meta.cardBoxShadow};
  transition:
    transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  text-decoration: none;

  ${({ theme }) => theme.meta.cardCss || ''}

  &:hover {
    transform: translateY(-0.2rem);
    background-color: ${({ theme }) => theme.background.cardHover};
    box-shadow:
      0 1.4rem 2.8rem rgba(0, 0, 0, 0.25),
      0 1rem 1rem rgba(0, 0, 0, 0.22);

    ${({ theme }) => theme.meta.cardHoverCss || ''}
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.border.focus};
    outline-offset: 0.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

const DescriptionWrapper = styled.div`
  flex-grow: 1;
`;

const DateWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  writtenDate?: Date;
}

export const ContentCard = ({ title, description, href, writtenDate }: ContentCardProps) => (
  <CardLink href={href}>
    <TitleWrapper>
      <Typography variant="h3">{title}</Typography>
      <TitleDecorator width="3.2rem" />
    </TitleWrapper>
    {writtenDate && (
      <DateWrapper>
        <Typography variant="secondary">{format(writtenDate, 'do MMM yyyy')}</Typography>
      </DateWrapper>
    )}
    <DescriptionWrapper>
      <Typography variant="body">{description}</Typography>
    </DescriptionWrapper>
  </CardLink>
);

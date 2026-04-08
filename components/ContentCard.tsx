import React from 'react';

import { format } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';

import { color } from '../styles/variables';

import { TitleDecorator } from './TitleDecorator';
import { Typography } from './Typography';

const CardLink = styled(Link)`
  cursor: pointer;
  border-radius: 0.8rem;
  min-height: 20rem;
  padding: 1.6rem;
  background-color: ${color.darkCard};
  color: ${color.cardText};
  border: 0.1rem solid rgba(255, 255, 255, 0.05);
  box-shadow:
    0 1rem 2rem rgba(0, 0, 0, 0.19),
    0 0.6rem 0.6rem rgba(0, 0, 0, 0.23);
  transition:
    transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:hover {
    transform: translateY(-0.2rem);
    background-color: ${color.cardHover};
    box-shadow:
      0 1.4rem 2.8rem rgba(0, 0, 0, 0.25),
      0 1rem 1rem rgba(0, 0, 0, 0.22);
  }

  &:focus-visible {
    outline: 0.2rem solid ${color.blue};
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

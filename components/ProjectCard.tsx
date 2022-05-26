import React from 'react';

import { format } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';

import { color } from '../styles/variables';
import { Typography } from './Typography';

const CardWrapper = styled.div`
  cursor: pointer;
  border-radius: 0.8rem;
  width: 32rem;
  height: 40rem;
  padding: 1.6rem;
  background-color: ${color.darkCard};
  box-shadow: 0 1rem 2rem rgba(0,0,0,0.19), 0 0.6rem 0.6rem rgba(0,0,0,0.23);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  display: flex;
  flex-direction: column;

  :hover {
    box-shadow: 0 1.4rem 2.8rem rgba(0,0,0,0.25), 0 1rem 1rem rgba(0,0,0,0.22);
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.4rem;
`;

const TitleDecorator = styled.div`
  width: 3.2rem;
  height: 0.2rem;
  background-color: ${color.yellow};
  border-radius: 0.1rem;
`;

const DescriptionWrapper = styled.div``;

const DateWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  writtenDate?: Date;
}

export const ProjectCard = ({ title, description, href, writtenDate }: ProjectCardProps) => (
  <Link href={href} passHref>
    <CardWrapper>
      <TitleWrapper>
        <Typography variant='h3'>
          {title}
        </Typography>
        <TitleDecorator />
      </TitleWrapper>
      {(writtenDate && <DateWrapper>
        <Typography variant='body'>
          written: {format(writtenDate, 'do MMM yyyy')}
        </Typography>
      </DateWrapper>)}
      <DescriptionWrapper>
        <Typography variant='body'>
          {description}
        </Typography>
      </DescriptionWrapper>
    </CardWrapper>
  </Link>
);

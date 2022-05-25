import React from 'react';

import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import styled from 'styled-components';

import { BulletList, BulletListItem } from './BulletList';
import { Typography } from './Typography';

const H1Wrapper = styled.div`
  margin-bottom: 1.6rem;
`;

const H1 = ({ children }: {children: React.ReactNode}) => (
  <H1Wrapper>
    <Typography variant='h1'>{children}</Typography>
  </H1Wrapper>
);

const H2Wrapper = styled.div`
  margin-bottom: 1.6rem;
`;

const H2 = ({ children }: {children: React.ReactNode}) => (
  <H2Wrapper>
    <Typography variant='h2'>{children}</Typography>
  </H2Wrapper>
);

const H3Wrapper = styled.div`
  margin-bottom: 1.6rem;
`;

const H3 = ({ children }: {children: React.ReactNode}) => (
  <H3Wrapper>
    <Typography variant='h3'>{children}</Typography>
  </H3Wrapper>
);

const PWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

const P = ({ children }: {children: React.ReactNode}) => (
  <PWrapper>
    <Typography variant='body'>{children}</Typography>
  </PWrapper>
);

const ListItemWrapper = styled.div`
  margin-bottom: 0.8rem;
`;

const ListItem = ({ children }: {children: React.ReactNode}) => (
  <ListItemWrapper>
    <BulletListItem>
      {children}
    </BulletListItem>
  </ListItemWrapper>
);

const ListWrapper = styled.div`
margin-bottom: 1.6rem;
`;

const List = ({ children }: {children: React.ReactNode & React.ReactNode[]}) => (
  <ListWrapper>
    <BulletList>
      {children}
    </BulletList>
  </ListWrapper>
);


const componentMap: Components = {
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  p: ({ children }) => <P>{children}</P>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  ul: ({ children }) => <List>{children}</List>,
};


export const Markdown = ({ content }: {content: string}) => (
  <ReactMarkdown components={componentMap}>{content}</ReactMarkdown>
);

import React from 'react';

import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';

import { color } from '../styles/variables';
import { BulletList, BulletListItem } from './BulletList';
import { AnchorLink, Typography } from './Typography';

const TitleWrapper = styled.div`
  margin-bottom: 1.4rem;
`;
const TitleDecorator = styled.div`
  width: 4rem;
  height: 0.2rem;
  background-color: ${color.yellow};
  border-radius: 0.1rem;
`;

const H1 = ({ children }: {children: React.ReactNode}) => (
  <TitleWrapper>
    <Typography variant='h1'>{children}</Typography>
    <TitleDecorator />
  </TitleWrapper>
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

const HorizontalRule = styled.hr`
  margin-bottom: 1.6rem;
  border: 0.1rem solid;
  border-radius: 0.1rem;
  border-color: ${color.cyan};
`;

const code = ({ inline, className, children }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      PreTag="div"
      customStyle={{ backgroundColor: color.darkCard, fontSize: '1.2rem', marginBottom: '1.6rem' }}
      language={match[1]}
      style={a11yDark as any}
      useInlineStyles={true}
    >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
  ) : (
    <SyntaxHighlighter
      PreTag="div"
      language="javascript"
      style={a11yDark as any}
      useInlineStyles={false}
      customStyle={{
        backgroundColor: color.darkCard,
        fontSize: '1.2rem',
        display: 'inline-block',
        padding: '0 0.4rem',
        borderRadius: '0.4rem',
      }}
    >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
  );
};

const componentMap: Components = {
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  p: ({ children }) => <P>{children}</P>,
  li: ({ children }) => <BulletListItem>{children}</BulletListItem>,
  ul: ({ children }) => <BulletList>{children}</BulletList>,
  a: ({ children, href }) => <AnchorLink href={href}>{children}</AnchorLink>,
  hr: () => <HorizontalRule />,
  code: (args) => code(args),
};

export const Markdown = ({ content }: {content: string}) => (
  <ReactMarkdown components={componentMap}>{content}</ReactMarkdown>
);

import React, { useMemo } from 'react';

import ReactMarkdown, { type Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styled, { useTheme } from 'styled-components';

import { codeThemes } from '../styles/codeThemes';

import { BulletList, BulletListItem } from './BulletList';
import { horizontalRuleVariants } from './Markdown.variants';
import { ProseContainer } from './ProseContainer';
import { AnchorLink, Typography } from './Typography';

const TitleWrapper = styled.div`
  margin-bottom: 1.4rem;
`;
const TitleDecorator = styled.div`
  width: 4rem;
  height: 0.2rem;
  background-color: ${({ theme }) => theme.meta.decoratorColor};
  border-radius: 0.1rem;
`;

const H1 = ({ children }: { children: React.ReactNode }) => (
  <TitleWrapper>
    <Typography variant="h1">{children}</Typography>
    <TitleDecorator />
  </TitleWrapper>
);

const H2Wrapper = styled.div`
  margin-bottom: 1.6rem;
`;

const H2 = ({ children }: { children: React.ReactNode }) => (
  <H2Wrapper>
    <Typography variant="h2">{children}</Typography>
  </H2Wrapper>
);

const H3Wrapper = styled.div`
  margin-bottom: 1.6rem;
`;

const H3 = ({ children }: { children: React.ReactNode }) => (
  <H3Wrapper>
    <Typography variant="h3">{children}</Typography>
  </H3Wrapper>
);

const PWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

const P = ({ children }: { children: React.ReactNode }) => (
  <PWrapper>
    <Typography variant="body">{children}</Typography>
  </PWrapper>
);

const HorizontalRule = styled.hr`
  margin-bottom: 1.6rem;
  border: 0.1rem solid;
  border-radius: 0.1rem;
  border-color: ${({ theme }) => theme.accent.highlight};

  ${({ theme }) => horizontalRuleVariants[theme.slug]}
`;

// In react-markdown v9, the `inline` prop is gone. Distinguish block vs inline
// code by the presence of a `language-*` className (block fences get one from
// remark; inline backticks do not).

export const Markdown = ({ content }: { content: string }) => {
  const theme = useTheme();

  const componentMap: Components = useMemo(
    () => ({
      h1: ({ children }) => <H1>{children}</H1>,
      h2: ({ children }) => <H2>{children}</H2>,
      h3: ({ children }) => <H3>{children}</H3>,
      p: ({ children }) => <P>{children}</P>,
      li: ({ children }) => <BulletListItem>{children}</BulletListItem>,
      ul: ({ children }) => <BulletList>{children}</BulletList>,
      a: ({ children, href }) => <AnchorLink href={href}>{children}</AnchorLink>,
      hr: () => <HorizontalRule />,
      code: ({ className, children }) => {
        const match = /language-(\w+)/.exec(className || '');
        const value = String(children).replace(/\n$/, '');
        const prismStyle = codeThemes[theme.meta.codeTheme] ?? codeThemes['a11yDark'];
        if (match) {
          return (
            <SyntaxHighlighter
              PreTag="div"
              customStyle={{
                backgroundColor: theme.background.code,
                fontSize: '1.2rem',
                marginBottom: '1.6rem',
              }}
              language={match[1]}
              style={prismStyle as never}
              useInlineStyles={true}
            >
              {value}
            </SyntaxHighlighter>
          );
        }
        return (
          <SyntaxHighlighter
            PreTag="span"
            customStyle={{
              backgroundColor: theme.background.code,
              fontSize: '1.2rem',
              display: 'inline-block',
              padding: '0 0.4rem',
              borderRadius: '0.4rem',
            }}
            language="javascript"
            style={prismStyle as never}
            useInlineStyles={false}
          >
            {value}
          </SyntaxHighlighter>
        );
      },
    }),
    [theme],
  );

  return (
    <ProseContainer>
      <ReactMarkdown components={componentMap}>{content}</ReactMarkdown>
    </ProseContainer>
  );
};

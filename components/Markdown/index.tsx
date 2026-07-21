import React, { useMemo } from 'react';

import ReactMarkdown, { type Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styled, { css, useTheme } from 'styled-components';

import { codeThemes } from '../../styles/codeThemes';
import { ProseContainer } from '../ProseContainer';
import { TitleDecorator } from '../TitleDecorator';
import { AnchorLink, Typography } from '../Typography';

import {
  blockquoteVariants,
  codeBlockVariants,
  horizontalRuleVariants,
  inlineCodeVariants,
  listVariants,
} from './variants';

const H1Wrapper = styled.div`
  margin-bottom: 1.4rem;
`;

const H1 = ({ children }: { children: React.ReactNode }) => (
  <H1Wrapper>
    <Typography variant="h1">{children}</Typography>
    <TitleDecorator />
  </H1Wrapper>
);

const H2Wrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 1.6rem;
`;

const H2 = ({ children }: { children: React.ReactNode }) => (
  <H2Wrapper>
    <Typography variant="h2">{children}</Typography>
    <TitleDecorator width="2.4rem" />
  </H2Wrapper>
);

const H3Wrapper = styled.div`
  margin-top: 3.2rem;
  margin-bottom: 1.6rem;
`;

const H3 = ({ children }: { children: React.ReactNode }) => (
  <H3Wrapper>
    <Typography variant="h3">{children}</Typography>
  </H3Wrapper>
);

const H4 = styled.h4`
  margin-top: 2.4rem;
  margin-bottom: 1.2rem;
  font-size: 1.8rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.meta.fontFamilyHeading || theme.meta.fontFamily};
  text-transform: ${({ theme }) => theme.meta.headingTransform || 'none'};
  letter-spacing: ${({ theme }) => theme.meta.headingLetterSpacing || 'normal'};
  font-style: ${({ theme }) => theme.meta.headingFontStyle || 'normal'};
`;

// Color is intentionally not set: prose inherits from the layout wrapper so
// blockquotes can mute descendant paragraphs to text.secondary.
const Paragraph = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;
  margin-bottom: 1.6rem;
`;

const listBase = css`
  margin-bottom: 2rem;
  padding-left: 2.4rem;

  li::marker {
    color: ${({ theme }) => theme.accent.primary};
  }

  ul,
  ol {
    margin-bottom: 0;
    margin-top: 0.8rem;
  }
`;

const UnorderedList = styled.ul`
  ${listBase}
  list-style-type: disc;

  ul {
    list-style-type: circle;
  }

  ul ul {
    list-style-type: square;
  }

  ${({ theme }) => listVariants[theme.slug]}
`;

const OrderedList = styled.ol`
  ${listBase}
  list-style-type: decimal;

  li::marker {
    font-weight: 700;
  }
`;

const ListItem = styled.li`
  font-size: 1.6rem;
  line-height: 2.4rem;
  margin-bottom: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }

  > p {
    margin-bottom: 0.8rem;
  }

  > p:last-of-type {
    margin-bottom: 0;
  }
`;

const Blockquote = styled.blockquote`
  margin-bottom: 2rem;
  padding-left: 1.6rem;
  border-left: 0.3rem solid ${({ theme }) => theme.accent.primary};
  color: ${({ theme }) => theme.text.secondary};

  > p:last-child {
    margin-bottom: 0;
  }

  ${({ theme }) => blockquoteVariants[theme.slug]}
`;

const CodeBlock = styled.div`
  margin-bottom: 2rem;
  border: 0.1rem solid ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.border.radius};
  overflow: hidden;

  ${({ theme }) => codeBlockVariants[theme.slug]}
`;

const InlineCode = styled.code`
  font-family: 'Fira Code', monospace;
  font-size: 0.85em;
  background-color: ${({ theme }) => theme.background.code};
  padding: 0.15em 0.4em;
  border-radius: 0.4rem;

  ${({ theme }) => inlineCodeVariants[theme.slug]}
`;

const MarkdownLink = styled(AnchorLink)`
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, currentColor 45%, transparent);
  text-underline-offset: 0.15em;

  &:hover {
    color: ${({ theme }) => theme.text.linkHover};
    text-decoration-color: currentColor;
  }
`;

const Strong = styled.strong`
  font-weight: 700;
`;

const Emphasis = styled.em`
  font-style: italic;
`;

const Strikethrough = styled.del`
  text-decoration: line-through;
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto 2rem;
  border: 0.1rem solid ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.border.radius};
`;

const HorizontalRule = styled.hr`
  margin: 3.2rem 0;
  border: 0.1rem solid;
  border-radius: 0.1rem;
  border-color: ${({ theme }) => theme.accent.highlight};

  ${({ theme }) => horizontalRuleVariants[theme.slug]}
`;

// In react-markdown v9, the `inline` prop is gone. Fenced blocks get a
// `language-*` class from remark; inline backticks do not. A bare fence with
// no language is caught by the newline check.
export const Markdown = ({ content }: { content: string }) => {
  const theme = useTheme();

  const componentMap: Components = useMemo(
    () => ({
      h1: ({ children }) => <H1>{children}</H1>,
      h2: ({ children }) => <H2>{children}</H2>,
      h3: ({ children }) => <H3>{children}</H3>,
      h4: ({ children }) => <H4>{children}</H4>,
      p: ({ children }) => <Paragraph>{children}</Paragraph>,
      ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
      ol: ({ children }) => <OrderedList>{children}</OrderedList>,
      li: ({ children }) => <ListItem>{children}</ListItem>,
      blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
      a: ({ children, href }) => <MarkdownLink href={href}>{children}</MarkdownLink>,
      strong: ({ children }) => <Strong>{children}</Strong>,
      em: ({ children }) => <Emphasis>{children}</Emphasis>,
      del: ({ children }) => <Strikethrough>{children}</Strikethrough>,
      img: ({ src, alt }) => <Image src={src} alt={alt ?? ''} />,
      hr: () => <HorizontalRule />,
      pre: ({ children }) => <>{children}</>,
      code: ({ className, children }) => {
        const match = /language-(\w+)/.exec(className || '');
        const value = String(children).replace(/\n$/, '');
        const prismStyle = codeThemes[theme.meta.codeTheme] ?? codeThemes['a11yDark'];
        const isBlock = Boolean(match) || value.includes('\n');

        if (isBlock) {
          return (
            <CodeBlock>
              <SyntaxHighlighter
                PreTag="div"
                customStyle={{
                  backgroundColor: theme.background.code,
                  fontSize: '1.4rem',
                  lineHeight: '1.6',
                  padding: '1.6rem',
                  margin: 0,
                }}
                language={match ? match[1] : 'text'}
                style={prismStyle as never}
                useInlineStyles={true}
              >
                {value}
              </SyntaxHighlighter>
            </CodeBlock>
          );
        }
        return <InlineCode>{value}</InlineCode>;
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

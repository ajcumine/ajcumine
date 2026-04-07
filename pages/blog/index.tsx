import React from 'react';

import { CardGrid } from '../../components/CardGrid';
import { ContentCard } from '../../components/ContentCard';
import { Page } from '../../components/Page';

interface BlogType {
  title: string;
  description: string;
  href: string;
  writtenDate: Date;
}

const blogCards: BlogType[] = [
  // {
  //   title: '',
  //   description: '',
  //   href: '',
  // },
  {
    title: 'Learning Elm',
    description: `I decided to learn elm, the strongly typed, functional programming language.
    This blogpost outlines my journey in learning elm.`,
    href: '/blog/learning-elm',
    writtenDate: new Date('2019-05-30'),
  },
];

const Blog = () => (
  <Page title="Blog">
    <CardGrid>
      {blogCards.map((blog) => (
        <ContentCard key={blog.href} {...blog} />
      ))}
    </CardGrid>
  </Page>
);

export default Blog;

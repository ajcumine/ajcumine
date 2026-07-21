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
  {
    title: 'Designing a bug process that closes the loop',
    description: `My experience in designing a bug process that works for everyone.`,
    href: '/blog/designing-a-bug-process',
    writtenDate: new Date('2026-04-01'),
  },
  {
    title: 'Estimates and deadlines',
    description: `Estimates are a communication tool, not a deadline. How to use estimates to plan and communicate effectively.`,
    href: '/blog/estimates-and-deadlines',
    writtenDate: new Date('2025-12-30')
  },
  {
    title: `Little's Law`,
    description: `A bit on queuing theory. A great tool for estimation using data.`,
    href: '/blog/littles-law',
    writtenDate: new Date('2025-12-30')
  },
  {
    title: 'Technical Project Ownership',
    description: `A guide for software engineers on what ownership of a technical project means.`,
    href: '/blog/technical-project-ownership',
    writtenDate: new Date('2024-05-14'),
  },
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

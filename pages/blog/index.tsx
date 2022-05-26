import React from 'react';

import styled from 'styled-components';

import { Page } from '../../components/Page';
import { ProjectCard } from '../../components/ProjectCard';

const BlogWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.6rem;
`;

interface BlogsType {
  title: string;
  description: string;
  href: string;
  writtenDate: Date;
}

const blogCards: BlogsType[] = [
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
  <Page title='Blog'>
    <BlogWrapper>
      {blogCards.map(blog => (
        <ProjectCard key={blog.href} {...blog} />
      ))}
    </BlogWrapper>
  </Page>
);

export default Blog;

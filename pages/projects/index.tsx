import React from 'react';

import { CardGrid } from '../../components/CardGrid';
import { ContentCard } from '../../components/ContentCard';
import { Page } from '../../components/Page';

interface ProjectType {
  title: string;
  description: string;
  href: string;
}

const projects: ProjectType[] = [
  {
    title: 'Future projects',
    description: 'things I might build in the future',
    href: '/projects/future-projects',
  },
  {
    title: 'PokElm',
    description: 'Pokémon tool built with Elm',
    href: '/projects/pokelm',
  },
];

const Projects = () => (
  <Page title="Projects">
    <CardGrid>
      {projects.map((project) => (
        <ContentCard key={project.href} {...project} />
      ))}
    </CardGrid>
  </Page>
);

export default Projects;

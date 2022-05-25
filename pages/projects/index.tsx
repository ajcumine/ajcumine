import React from 'react';

import styled from 'styled-components';

import { Page } from '../../components/Page';
import { ProjectCard } from '../../components/ProjectCard';

const ProjectsWrapper = styled.div``;

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
];

const Projects = () => (
  <Page title='Projects'>
    <ProjectsWrapper>
      {projects.map(project => (
        <ProjectCard key={project.href} {...project} />
      ))}
    </ProjectsWrapper>
  </Page>
);

export default Projects;

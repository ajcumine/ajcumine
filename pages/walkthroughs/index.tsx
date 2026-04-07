import React from 'react';

import styled from 'styled-components';

import { Page } from '../../components/Page';
import { ProjectCard } from '../../components/ProjectCard';

const WalkthroughsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.6rem;
`;

interface WalkthroughEntry {
  title: string;
  description: string;
  href: string;
}

const walkthroughs: WalkthroughEntry[] = [
  {
    title: 'Skyrim',
    description:
      'Completionist walkthrough for The Elder Scrolls V: Skyrim. All quests, guilds, DLC, Daedric artifacts, and collectibles.',
    href: '/walkthroughs/skyrim',
  },
];

const Walkthroughs = () => (
  <Page title="Walkthroughs">
    <WalkthroughsWrapper>
      {walkthroughs.map((w) => (
        <ProjectCard key={w.href} {...w} />
      ))}
    </WalkthroughsWrapper>
  </Page>
);

export default Walkthroughs;

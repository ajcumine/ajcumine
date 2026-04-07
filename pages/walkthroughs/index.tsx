import React from 'react';

import { CardGrid } from '../../components/CardGrid';
import { ContentCard } from '../../components/ContentCard';
import { Page } from '../../components/Page';

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
    <CardGrid>
      {walkthroughs.map((w) => (
        <ContentCard key={w.href} {...w} />
      ))}
    </CardGrid>
  </Page>
);

export default Walkthroughs;

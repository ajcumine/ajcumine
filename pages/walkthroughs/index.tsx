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
  {
    title: 'FM24 Chelsea 1998/99',
    description:
      'Football Manager 2024 long-term save guide: sign all-time greats (Messi, Ronaldo, Ronaldinho) and Chelsea legends (Lampard, Drogba, Kanté) from 1998 to 2026.',
    href: '/walkthroughs/fm24-chelsea-1998',
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

import fs from 'fs/promises';
import path from 'path';

import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { Page } from '../../components/Page';
import { WalkthroughChecklist } from '../../components/WalkthroughChecklist';

const WALKTHROUGHS_DIR = 'public/docs/walkthroughs';

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await fs.readdir(WALKTHROUGHS_DIR);
  const paths = files
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ params: { game: f.replace('.md', '') } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const game = params?.game as string;
  const filePath = path.join(WALKTHROUGHS_DIR, `${game}.md`);
  const content = await fs.readFile(filePath, { encoding: 'utf8' });

  return { props: { content, game } };
};

const WalkthroughPage = ({ content, game }: { content: string; game: string }) => (
  <Page>
    <WalkthroughChecklist content={content} gameSlug={game} />
  </Page>
);

export default WalkthroughPage;

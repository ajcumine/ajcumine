import fs from 'fs/promises';

import React from 'react';

import { Markdown } from '../../components/Markdown';
import { Page } from '../../components/Page';

export async function getStaticProps() {
  const content = await fs.readFile('public/docs/blog/littles-law.md', { encoding: 'utf8' });

  return {
    props: { content },
  };
}

const LittlesLaw = ({ content }: { content: string }) => {
  return (
    <Page>
      <Markdown content={content} />
    </Page>
  );
};

export default LittlesLaw;

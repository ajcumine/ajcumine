import fs from 'fs/promises';

import React from 'react';

import { Markdown } from '../components/Markdown';
import { Page } from '../components/Page';

export async function getStaticProps() {
  const content = await fs.readFile('public/docs/about.md',{ encoding: 'utf8' });

  return {
    props: { content },
  };
}

const About = ({ content }: {content: string}) => {

  return(
    <Page>
      <Markdown content={content} />
    </Page>
  );
};

export default About;

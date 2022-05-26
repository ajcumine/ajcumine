import fs from 'fs/promises';

import React from 'react';

import { Markdown } from '../../components/Markdown';
import { Page } from '../../components/Page';

export async function getStaticProps() {
  const content = await fs.readFile('public/docs/blog/learning-elm.md',{ encoding: 'utf8' });

  return {
    props: { content },
  };
}

const LearningElm = ({ content }: {content: string}) => {

  return(
    <Page>
      <Markdown content={content} />
    </Page>
  );
};

export default LearningElm;

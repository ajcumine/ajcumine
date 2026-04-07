import '../styles/globals.css';

import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { StyleSheetManager } from 'styled-components';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>@ajcumine</title>
      <link href="/favicon.ico" rel="icon" />
    </Head>
    <StyleSheetManager shouldForwardProp={(prop) => !prop.startsWith('$')}>
      <Component {...pageProps} />
    </StyleSheetManager>
  </>
);

export default MyApp;

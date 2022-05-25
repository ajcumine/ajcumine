import '../styles/globals.css';

import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>@ajcumine</title>
      <link href="/favicon.ico" rel="icon" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;

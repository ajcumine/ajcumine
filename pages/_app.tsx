import '../styles/globals.css';

import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { StyleSheetManager } from 'styled-components';

import { Clippy } from '../components/Clippy';
import { ThemeGlobalStyles } from '../components/ThemeGlobalStyles';
import { ThemeContextProvider } from '../styles/ThemeContext';
import { themes } from '../styles/themes';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>@ajcumine</title>
      <link href="/favicon.ico" rel="icon" />
    </Head>
    <StyleSheetManager shouldForwardProp={(prop) => !prop.startsWith('$')}>
      <ThemeContextProvider themes={themes}>
        <ThemeGlobalStyles />
        <Component {...pageProps} />
        <Clippy />
      </ThemeContextProvider>
    </StyleSheetManager>
  </>
);

export default MyApp;

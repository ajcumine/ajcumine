import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>@ajcumine</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;

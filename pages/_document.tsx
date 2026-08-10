import React from 'react';

import Document, { Head, Html, Main, NextScript } from 'next/document';

import { DEFAULT_THEME_SLUG, themes } from '../styles/themes';

const THEME_SLUGS = Object.keys(themes);

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('site-theme');
    var slugs = ${JSON.stringify(THEME_SLUGS)};
    var slug = slugs.includes(stored) ? stored : '${DEFAULT_THEME_SLUG}';
    var html = document.documentElement;
    html.setAttribute('data-theme', slug);
    html.setAttribute('data-theme-loading', '');
    var style = document.createElement('style');
    style.textContent = 'html[data-theme-loading] body { opacity: 0; }';
    document.head.appendChild(style);
  } catch (e) {}
})();
`;

class MyDocument extends Document {
  override render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

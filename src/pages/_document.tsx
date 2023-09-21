import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="surfe icon" href="/favicon.ico" />
          <meta name="NaverBot" content="All" />
          <meta name="NaverBot" content="index,follow" />
          <meta name="Yeti" content="All" />
          <meta name="Yeti" content="index,follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="author" content="서피" />
          <meta name="keywords" content="채팅, 친구" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

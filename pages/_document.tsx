import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>서피</title>
          <meta name="description" content="채팅을 위한 서비스, 서피입니다." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="bg-white dark:bg-dark-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

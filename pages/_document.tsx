import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body className="bg-white dark:bg-dark-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

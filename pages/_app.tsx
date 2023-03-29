import React from "react";
import { RecoilRoot } from "recoil";
import localFont from "next/font/local";

import type { AppProps } from "next/app";

import "styles/globals.css";

const myFont = localFont({ src: "./NanumSquareR.woff2" });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <main className={myFont.className}>
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  );
}

export default MyApp;
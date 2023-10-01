import React from "react";
import { RecoilRoot } from "recoil";
import { IBM_Plex_Sans_KR, Marhey } from "next/font/google";
import Head from "next/head";

import MemberContext from "contexts/member";
import { fetchProfileSSR } from "pages/api/my";
import DefaultSEO from "pages/DefaultSEO";
import type { AppProps } from "next/app";

import "styles/globals.css";

const iBMPlexSansKR = IBM_Plex_Sans_KR({ weight: ["400", "500", "600", "700"], preload: false });
const marhey = Marhey({ weight: "400", preload: false, variable: "--marhey" });

MyApp.getInitialProps = async ({ Component, router, ctx }: any) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const isServer = !!(ctx && ctx.req);

  if (isServer) {
    const token = ctx.req.headers.cookie;

    const profile = await fetchProfileSSR(token).catch((error) => {
      return null;
    });

    return {
      me: profile,
      pageProps,
    };
  }

  return {
    props: {
      pageProps,
    },
  };
};

interface CustomAppProps extends AppProps {
  me: null;
}

function MyApp({ Component, pageProps, me }: CustomAppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <DefaultSEO />
      <RecoilRoot>
        <MemberContext.Provider value={me}>
          <main className={`${iBMPlexSansKR.className} ${marhey.variable}`}>
            <Component {...pageProps} />
          </main>
        </MemberContext.Provider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

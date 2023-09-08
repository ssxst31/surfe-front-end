import React from "react";
import { RecoilRoot } from "recoil";
import { IBM_Plex_Sans_KR } from "next/font/google";

import MemberContext from "contexts/member";
import { fetchProfileSSR } from "pages/api/my";
import DefaultSEO from "pages/DefaultSEO";
import DefaultLayout from "components/layouts/DefaultLayout";
import type { AppProps } from "next/app";

import "styles/globals.css";

const iBMPlexSansKR = IBM_Plex_Sans_KR({ weight: "400", preload: false });

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
      <DefaultSEO />
      <RecoilRoot>
        <MemberContext.Provider value={me}>
          <DefaultLayout>
            <main className={iBMPlexSansKR.className}>
              <Component {...pageProps} />
            </main>
          </DefaultLayout>
        </MemberContext.Provider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

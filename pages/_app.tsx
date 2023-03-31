import React from "react";
import { RecoilRoot } from "recoil";
import localFont from "next/font/local";

import MemberContext from "contexts/member";
import { fetchProfileSSR } from "pages/api/user";
import DefaultSEO from "pages/DefaultSEO";
import DefaultLayout from "components/layouts/DefaultLayout";
import LoginWrapper from "components/LoginWrapper";
import UnLoginWrapper from "components/UnLoginWrapper";

import "styles/globals.css";

const myFont = localFont({ src: "./NanumSquareR.woff2" });

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

function MyApp({ Component, pageProps, me }: any) {
  return (
    <>
      <DefaultSEO />
      <RecoilRoot>
        <MemberContext.Provider value={me}>
          <LoginWrapper>
            <UnLoginWrapper>
              <DefaultLayout>
                <main className={myFont.className}>
                  <Component {...pageProps} />
                </main>
              </DefaultLayout>
            </UnLoginWrapper>
          </LoginWrapper>
        </MemberContext.Provider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

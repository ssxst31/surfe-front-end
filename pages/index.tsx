import React from "react";

import type { GetServerSideProps, NextPage } from "next";
import { fetchProfile } from "pages/api/user";
import Main from "components/Main";
import DefaultLayout from "layouts/DefaultLayout";

interface HomeProps {
  fallback: any;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.headers.cookie;
  const api = process.env.NEXT_PUBLIC_APP_HOST_NAME;
  const res = await fetchProfile(token).catch((error) => {
    return error;
  });

  const profile = res;

  return {
    props: {
      profile,
      api,
    },
  };
};

const Home: NextPage<HomeProps> = ({ profile, api }: any) => {
  console.log(profile, api, process.env.NEXT_PUBLIC_APP_HOST_NAME);
  return (
    <>
      <DefaultLayout>
        <Main profile={profile} />
      </DefaultLayout>
    </>
  );
};

export default Home;

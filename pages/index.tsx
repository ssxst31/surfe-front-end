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

  const res = await fetchProfile(token).catch((error) => {
    return null;
  });

  const profile = res;

  return {
    props: {
      profile,
    },
  };
};

const Home: NextPage<HomeProps> = ({ profile }: any) => {
  return (
    <>
      <DefaultLayout>
        <Main profile={profile} />
      </DefaultLayout>
    </>
  );
};

export default Home;

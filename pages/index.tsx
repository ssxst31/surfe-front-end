import React from "react";

import type { GetServerSideProps, NextPage } from "next";

import Main from "components/Main";

interface HomeProps {
  fallback: any;
}

const Home: NextPage<HomeProps> = ({ profile }: any) => {
  return <Main />;
};

export default Home;

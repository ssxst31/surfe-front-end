import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/router";

import type { GetServerSideProps, NextPage } from "next";
import { fetchProfile } from "app/api/user";

interface HomeProps {
  fallback: any;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const title = context.params?.title;

  const res = await fetchProfile("1").catch((error) => {
    return null;
  });
  console.log(res);
  return {
    props: {
      res,
    },
  };
};

const Home: NextPage<HomeProps> = ({ res }: any) => {
  console.log(res);
  const router = useRouter();
  const { tab } = router.query;
  const sort = (tab ?? "total") as string;

  const [btnText, setBtnText] = useState<any>("");

  return <>123</>;
};

export default Home;

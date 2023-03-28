import EveryChat from "components/everyChat";
import { useEffect } from "react";
import { useRouter } from "next/router";

import type { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.headers.cookie ?? null;

  return {
    props: {
      token,
    },
  };
};

interface EveryChatPageProps {
  token: any;
}

const EveryChatPage: NextPage<EveryChatPageProps> = ({ token }) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return <EveryChat />;
};

export default EveryChatPage;

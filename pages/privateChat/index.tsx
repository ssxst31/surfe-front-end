import { useEffect } from "react";
import { useRouter } from "next/router";

import type { GetServerSideProps, NextPage } from "next";
import Chat from "components/Chat";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.headers.cookie ?? null;

  return {
    props: {
      token,
    },
  };
};

interface PrivateChatPageProps {
  token: any;
}

const PrivateChatPage: NextPage<PrivateChatPageProps> = ({ token }) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return <Chat />;
};

export default PrivateChatPage;

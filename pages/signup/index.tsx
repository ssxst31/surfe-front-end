import { useRouter } from "next/router";

import type { GetServerSideProps, NextPage } from "next";
import SignUp from "components/SignUp";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.headers.cookie ?? null;

  return {
    props: {
      token,
    },
  };
};

interface SignUpPageProps {
  token: string;
}

const SignUpPage: NextPage<SignUpPageProps> = ({ token }) => {
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  return <SignUp />;
};

export default SignUpPage;

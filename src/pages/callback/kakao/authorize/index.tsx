import { useEffect } from "react";
import axios from "axios";

import type { GetServerSideProps } from "next";
import * as authApi from "pages/api/auth";

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || "";

async function fetchAccessToken(code: string): Promise<string> {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  const data = new URLSearchParams();
  data.append("grant_type", "authorization_code");
  data.append("client_id", KAKAO_APP_KEY);
  data.append("redirect_uri", "http://localhost:3000/callback/kakao/authorize");
  data.append("code", code);

  try {
    const response = await axios.post("https://kauth.kakao.com/oauth/token", data, config);
    return response.data.access_token || "";
  } catch (error) {
    console.error("Failed to fetch access token:", error);
    return "";
  }
}

interface AuthorizeProps {
  accessToken: string;
}

export const getServerSideProps: GetServerSideProps<AuthorizeProps> = async (context) => {
  const code = Array.isArray(context.query.code) ? context.query.code[0] : context.query.code || "";
  const accessToken = await fetchAccessToken(code);

  return { props: { accessToken } };
};

const Authorize = ({ accessToken }: AuthorizeProps) => {
  useEffect(() => {
    signInOrSignUpKakao();
  }, []);

  const signInOrSignUpKakao = async () => {
    try {
      await authApi.signInWithKaKao({ accessToken });
    } catch (error) {
      console.error("Failed to sign in with Kakao:", error);
    }
  };

  return <h2>로그인 중입니다..</h2>;
};

export default Authorize;

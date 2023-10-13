import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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
  data.append("redirect_uri", `${process.env.NEXT_PUBLIC_APP_HOST_NAME}/callback/kakao/authorize`);
  data.append("code", code);

  try {
    const response = await axios.post("https://kauth.kakao.com/oauth/token", data, config);
    return response.data.access_token || "";
  } catch (error) {
    console.error("Failed to fetch access token:", error);
    return "";
  }
}

async function fetchUserFromKakao(accessToken: string): Promise<any> {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken} `,
    },
  };

  try {
    const response = await axios.get("https://kapi.kakao.com/v2/user/me", config);
    return response;
  } catch (error) {
    console.error("Failed to fetch access token:", error);
    return "";
  }
}

interface AuthorizeProps {
  userInfo: any;
}

export const getServerSideProps: GetServerSideProps<AuthorizeProps> = async (context) => {
  const code = Array.isArray(context.query.code) ? context.query.code[0] : context.query.code || "";
  const accessToken = await fetchAccessToken(code);

  const res = await fetchUserFromKakao(accessToken);

  return { props: { userInfo: res.data } };
};

const Authorize = ({ userInfo }: AuthorizeProps) => {
  const router = useRouter();

  useEffect(() => {
    signInOrSignUpKakao();
  }, []);

  const signInOrSignUpKakao = async () => {
    const res = await authApi.kakaoLogin(userInfo.id);

    if (res.message === "OK") {
      window.location.assign(`${process.env.NEXT_PUBLIC_APP_HOST_NAME}/explore`);
    }
  };

  return <h2>로그인 중입니다..</h2>;
};

export default Authorize;

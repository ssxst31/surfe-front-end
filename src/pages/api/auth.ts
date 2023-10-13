import customAxios from "pages/api";

export async function createUser(inputs: any, interestList: string[], mbti: string, statusMessage: string) {
  const { id, password, nickname } = inputs;

  return await customAxios.post<null, any>(`/auth/create`, {
    id,
    password,
    nickname,
    interestList,
    mbti,
    statusMessage,
  });
}

export async function login({ id, password }: { id: string; password: string }) {
  return await customAxios.post<null, any>(`/auth/login`, {
    id,
    password,
  });
}

export async function signInWithKaKao({ accessToken }: { accessToken: string }) {
  return await customAxios.post<null, any>(`/auth/kakao-login`, {
    accessToken,
  });
}

export async function logOut() {
  return await customAxios.get<null, any>("/auth/logout");
}

export async function kakaoLogin(kakaoId: number) {
  return await customAxios.post<null, any>("/auth/kakaoLogin", {
    kakaoId,
  });
}

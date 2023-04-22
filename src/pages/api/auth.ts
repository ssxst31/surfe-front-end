import customAxios from "pages/api";

export async function createUser(inputs: any, interestList: string[], mbti: string, introduce: string) {
  const { email, password, nickname } = inputs;

  return await customAxios.post<null, any>(`/auth/create`, {
    email,
    password,
    nickname,
    interestList,
    mbti,
    introduce,
  });
}

export async function login({ email, password }: { email: string; password: string }) {
  return await customAxios.post<null, any>(`/auth/login`, {
    email,
    password,
  });
}

export async function logOut() {
  return await customAxios.get<null, any>("/auth/logout");
}
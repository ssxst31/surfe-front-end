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

export async function logOut() {
  return await customAxios.get<null, any>("/auth/logout");
}

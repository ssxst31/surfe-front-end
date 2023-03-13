import customAxios from "app/api";

export async function createUser({ email, password, nickname }: any) {
  return await customAxios.post<null, any>(`/auth/create`, {
    email,
    password,
    nickname,
  });
}

export async function login({ email, password }: any) {
  return await customAxios.post<null, any>(`/auth/login`, {
    email,
    password,
  });
}

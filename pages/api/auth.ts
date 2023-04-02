import customAxios from "pages/api";

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

export async function logOut() {
  return await customAxios.get<null, any>("/auth/logout");
}

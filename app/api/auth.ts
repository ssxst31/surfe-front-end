import customAxios from "app/api";

export async function createUser({ email, password, nickname, lat, lng }: any) {
  return await customAxios.post<null, any>(`/auth/create`, {
    email,
    password,
    nickname,
    lat,
    lng,
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

import customAxios from "./index";

export async function createUser({ email, password, nickname }: any) {
  return await customAxios.post<null, any>(`/users/create`, {
    email,
    password,
    nickname,
  });
}

export async function fetchProfile() {
  return await customAxios.post<null, any>(`/users/profile`);
}

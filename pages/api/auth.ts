import customAxios from "pages/api";

export async function createUser(inputs: any, interestList: any) {
  const { email, password, nickname } = inputs;

  return await customAxios.post<null, any>(`/auth/create`, {
    email,
    password,
    nickname,
    interestList,
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

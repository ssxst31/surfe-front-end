import customAxios from "app/api";

export async function createUser({ email, password, nickname }: any) {
  return await customAxios.post<null, any>(`/users/create`, {
    email,
    password,
    nickname,
  });
}

export async function login({ email, password }: any) {
  return await customAxios.post<null, any>(`/users/login`, {
    email,
    password,
  });
}

export async function fetchProfile(token: any) {
  const tokenCookied = token.name + "=" + token.value + ";";

  return await customAxios.post<null, any>(
    "/users/profile",
    {},
    {
      headers: {
        cookies: tokenCookied,
      },
    },
  );
}

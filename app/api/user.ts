import customAxios from "app/api";

export async function fetchProfile(token: any) {
  const tokenCookied = token.name + "=" + token.value + ";";

  return await customAxios.post<null, any>(
    "/user/profile",
    {},
    {
      headers: {
        cookies: tokenCookied,
      },
    },
  );
}

export async function fetchUserList() {
  return await customAxios.get<null, any>("/user/list");
}

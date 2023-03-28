import customAxios from "pages/api";

export async function fetchProfile(token: any) {
  return await customAxios.get<null, any>("/user/profile", {
    headers: {
      cookies: token,
    },
  });
}

export async function fetchUserList() {
  return await customAxios.get<null, any>("/user/list");
}

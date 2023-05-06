import customAxios from "pages/api";

export async function fetchUserListByMeDistance() {
  return await customAxios.get<null, any>("/users/nearby");
}

export async function fetchUserProfile(userId: any) {
  return await customAxios.get<null, any>(`/users/profile/${userId}`);
}

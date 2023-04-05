import customAxios from "pages/api";

export async function fetchProfile() {
  return await customAxios.get<null, any>("/user/profile", {});
}

export async function fetchProfileSSR(token: any) {
  return await customAxios.get<null, any>("/user/profile", {
    headers: {
      cookies: token,
    },
  });
}

export async function fetchUserListByMeDistance() {
  return await customAxios.get<null, any>("/user/userListByMeDistance");
}

export async function addLocation(memberId: any, lat: any, lng: any) {
  return await customAxios.post<null, any>("/user/location", {
    memberId,
    lat,
    lng,
  });
}

export async function fetchUserInterestList(userId: any) {
  return await customAxios.get<null, any>(`/user/interestList/${userId}`);
}

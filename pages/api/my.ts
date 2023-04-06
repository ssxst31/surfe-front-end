import customAxios from "pages/api";

export async function fetchProfile() {
  return await customAxios.get<null, any>("/my/profile", {});
}

export async function fetchProfileSSR(token: any) {
  return await customAxios.get<null, any>("/my/profile", {
    headers: {
      cookies: token,
    },
  });
}

export async function addLocation(lat: any, lng: any) {
  return await customAxios.post<null, any>("/my/location", {
    lat,
    lng,
  });
}

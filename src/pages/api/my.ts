import customAxios from "pages/api";
import { Friend, Me } from "type/index";

export async function fetchProfile() {
  return await customAxios.get<null, Me>("/my/profile", {});
}

export async function fetchProfileSSR(token: string) {
  return await customAxios.get<null, Me>("/my/profile", {
    headers: {
      cookies: token,
    },
  });
}

export async function addLocation(lat: number | undefined, lng: number | undefined) {
  return await customAxios.post<null, any>("/my/location", {
    lat,
    lng,
  });
}

export async function postThumbnail(formData: FormData) {
  return await customAxios.post<null, any>("/my/upload", formData);
}

export async function addFriend(friendId: number) {
  return await customAxios.post<null, any>("/my/addFriend", {
    friendId,
  });
}

export async function deleteFriend(friendId: number) {
  return await customAxios.post<null, any>("/my/deleteFriend", {
    friendId,
  });
}

export async function fetchFriendList() {
  return await customAxios.get<null, Friend[]>("/my/friendList");
}

export async function fetchFriendRequestList() {
  return await customAxios.get<null, Friend[]>("/my/friendRequestList");
}
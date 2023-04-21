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

export async function postThumbnail(formData: any) {
  return await customAxios.post<null, any>("/my/upload", formData);
}

export async function addFriend(friendId: any) {
  return await customAxios.post<null, any>("/my/addFriend", {
    friendId,
  });
}

export async function deleteFriend(friendId: any) {
  return await customAxios.post<null, any>("/my/deleteFriend", {
    friendId,
  });
}

export async function fetchFriendList() {
  return await customAxios.get<null, any>("/my/friendList");
}

export async function fetchFriendRequestList() {
  return await customAxios.get<null, any>("/my/friendRequestList");
}

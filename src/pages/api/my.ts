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

export async function addFriend(friendId: number): Promise<void> {
  return await customAxios.post<null, any>("/my/friends", {
    friendId,
  });
}

export async function deleteFriend(friendId: number): Promise<void> {
  return await customAxios.post<null, any>("/my/friends/cancel", {
    friendId,
  });
}

export async function fetchFriendList() {
  return await customAxios.get<null, Friend[]>("/my/friends");
}

export async function fetchFriendRequestList() {
  return await customAxios.get<null, Friend[]>("/my/friend-requests");
}

export async function fetchFriendReceiveList() {
  return await customAxios.get<null, Friend[]>("/my/friend-receives");
}

export async function fetchChatRoomList() {
  return await customAxios.get<null, any>("/my/chats");
}

export async function fetchChat(limit: number, roomName: string) {
  return await customAxios.get<null, any>(`/my/chat?limit=${limit}&roomName=${roomName}`);
}

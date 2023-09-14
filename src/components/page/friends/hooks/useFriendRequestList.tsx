import useSWR, { useSWRConfig } from "swr";

import { Friend } from "type";
import * as apiMy from "pages/api/my";

export default function useFriendRequestList() {
  const { mutate } = useSWRConfig();

  const { data } = useSWR("/my/friend-requests", apiMy.fetchFriendRequestList);

  async function loadFriendRequestList() {
    await mutate("/my/friend-requests");
  }

  const deleteFriend = async (friendId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await apiMy.deleteFriend(friendId);
      loadFriendRequestList();
    }
  };

  const friendRequestList: Friend[] | undefined = data;

  return { friendRequestList, deleteFriend };
}

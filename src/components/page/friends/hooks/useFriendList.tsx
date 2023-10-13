import useSWR, { useSWRConfig } from "swr";

import { Friend } from "type";
import * as apiMy from "pages/api/my";

export default function useFriendList() {
  const { mutate } = useSWRConfig();

  const { data } = useSWR("/my/friends", apiMy.fetchFriendList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  async function loadFriendList() {
    await mutate("/my/friends");
  }

  const deleteFriend = async (friendId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await apiMy.deleteFriend(friendId);
      loadFriendList();
    }
  };

  const friendList: Friend[] | undefined = data;

  return { friendList, deleteFriend };
}

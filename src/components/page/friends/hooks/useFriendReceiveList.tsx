import useSWR, { useSWRConfig } from "swr";

import { Friend } from "type";
import * as apiMy from "pages/api/my";

export default function useFriendReceiveList() {
  const { mutate } = useSWRConfig();

  const { data } = useSWR("/my/friend-receives", apiMy.fetchFriendReceiveList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallback: [],
  });

  async function loadFriendList() {
    await mutate("/my/friend-receives");
  }

  const postFriend = async (userId: number) => {
    try {
      await apiMy.addFriend(userId);
      loadFriendList();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const friendReceiveList: Friend[] | undefined = data;

  return { friendReceiveList, postFriend };
}

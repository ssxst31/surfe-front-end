import useSWR, { useSWRConfig } from "swr";

import { fetchUserListByMeDistance } from "pages/api/users";
import { NearUser } from "type";

export default function useNearUserList() {
  const { mutate } = useSWRConfig();

  const { data } = useSWR("/users/nearby", fetchUserListByMeDistance, { fallback: 1 });

  async function loadNearUserList() {
    await mutate("/users/nearby");
  }

  const nearUserList: NearUser[] | undefined = data;

  return { nearUserList, loadNearUserList };
}

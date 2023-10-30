import useSWR from "swr";

import { fetchProfile } from "pages/api/my";
import { Me } from "type";

export default function useMe() {
  const { data } = useSWR("/my/profile", fetchProfile, {
    fallback: {},
  });

  const me = data as Me;

  return {
    me,
  };
}

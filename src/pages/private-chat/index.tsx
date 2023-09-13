import { useSearchParams } from "next/navigation";

import type { NextPage } from "next";
import PrivateChat from "components/page/privateChat/PrivateChat";
import useMe from "hooks/useMe";

const PrivateChatPage: NextPage = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("room");
  const me = useMe();

  const createRoomName = () => {
    if (me.id > Number(search)) {
      return `${Number(search)}_${me.id}`;
    } else {
      return `${me.id}_${Number(search)}`;
    }
  };

  return <PrivateChat roomName={createRoomName()} />;
};

export default PrivateChatPage;

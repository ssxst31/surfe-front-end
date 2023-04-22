import type { NextPage } from "next";
import Chat from "components/Chat";
import useMe from "hooks/useMe";
import { useSearchParams } from "next/navigation";

const PrivateChatPage: NextPage = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("room");
  const me = useMe();

  const createRoomName = () => {
    if (me.user_id > Number(search)) {
      return `${Number(search)}_${me.user_id}`;
    } else {
      return `${me.user_id}_${Number(search)}`;
    }
  };

  return <Chat roomName={createRoomName()} />;
};

export default PrivateChatPage;

import { useRouter } from "next/router";
import type { NextPage } from "next";

import useMe from "hooks/useMe";
import ChatContainer from "pages/chats/_components/ChatContainer";
import DefaultLayout from "components/layouts/DefaultLayout";

const ChatPage: NextPage = () => {
  const router = useRouter();
  const me = useMe();
  const { roomId } = router.query;

  const createRoomName = () => {
    if (me.id > Number(roomId)) {
      return `${Number(roomId)}_${me.id}`;
    } else {
      return `${me.id}_${Number(roomId)}`;
    }
  };

  return (
    <DefaultLayout>
      <ChatContainer roomName={roomId === "every" ? "room1" : createRoomName()} />
    </DefaultLayout>
  );
};

export default ChatPage;

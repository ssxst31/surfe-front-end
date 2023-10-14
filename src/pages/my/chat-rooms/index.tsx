import type { NextPage } from "next";

import DefaultLayout from "components/layouts/DefaultLayout";
import ChatRoomList from "pages/my/chat-rooms/_component/ChatRoomList";

const ChatRoomsPage: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="w-full p-3">
        <div className="divide-y">
          <ChatRoomList />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ChatRoomsPage;

import React, { useState, useEffect } from "react";

import type { NextPage } from "next";
import { ChatMessage } from "type";
import * as myApi from "pages/api/my";
import ChatRoom from "pages/my/chat-rooms/_component/ChatRoom";

const ChatRoomsPage: NextPage = () => {
  const [chatRoomList, setChatRoomList] = useState<ChatMessage[]>();

  const loadChatList = async () => {
    const res = await myApi.fetchChatRoomList();

    setChatRoomList(res);
  };

  useEffect(() => {
    loadChatList();
  }, []);

  if (!chatRoomList) return <></>;

  if (!chatRoomList.length) return <div className="text-center text-gray-200">참여중인 채팅방이 없습니다.</div>;

  return (
    <>
      {chatRoomList.map((chat: any) => (
        <ChatRoom key={chat.roomName} />
      ))}
    </>
  );
};

export default ChatRoomsPage;

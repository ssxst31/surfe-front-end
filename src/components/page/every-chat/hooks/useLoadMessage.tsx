import { useState, useEffect } from "react";

import { ChatMessage } from "type";
import { fetchChat } from "pages/api/my";
import ws from "datasources/ws";
import useMe from "hooks/useMe";

interface useChatMessageProps {
  roomName: string;
  limit: number;
}

export default function useChatMessage({ roomName, limit }: useChatMessageProps) {
  const me = useMe();

  const [chatMessageList, setChatMessageList] = useState<ChatMessage[]>();
  const [historyChatMessageList, setHistoryChatMessageList] = useState<ChatMessage[]>([]);

  useEffect(() => {
    ws.on("RECEIVE_MESSAGE", (data: { chatList: ChatMessage[] }) => {
      setChatMessageList(data.chatList);
    });
  }, [ws, chatMessageList]);

  useEffect(() => {
    ws.emit("JOIN_ROOM", {
      nickname: me.nickname,
      roomName,
    });
  }, []);

  const loadHistoryChatMessage = async () => {
    const res = await fetchChat(limit + 30, roomName);
    setHistoryChatMessageList(res);
  };

  return { chatMessageList, loadHistoryChatMessage, historyChatMessageList };
}

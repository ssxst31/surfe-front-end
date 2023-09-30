import { useState, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";

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
  const { mutate } = useSWRConfig();

  const [chatMessageList, setChatMessageList] = useState<ChatMessage[]>([]);
  const { data } = useSWR(`/my/chat?limit=${limit}&roomName=${roomName}`, () => fetchChat(limit + 30, roomName));

  ws.on("RECEIVE_MESSAGE", (data: { chatList: ChatMessage[] }) => {
    setChatMessageList(data.chatList);
  });

  useEffect(() => {
    ws.emit("JOIN_ROOM", {
      nickname: me.nickname,
      roomName,
    });
  }, []);

  async function loadHistoryChatMessage() {
    await mutate(`/my/chat?limit=${limit}&roomName=${roomName}`);
  }

  const historyChatMessageList: ChatMessage[] | undefined = data;

  return { chatMessageList, loadHistoryChatMessage, historyChatMessageList };
}

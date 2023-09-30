import { useState, useEffect, useRef } from "react";

import useVisible from "hooks/useVisible";
import ChatForm from "pages/chats/_components/ChatForm";
import MessageList from "pages/chats/_components/MessageList";
import useLoadMessage from "pages/chats/_hooks/useLoadMessage";

interface MessageListProps {
  roomName: string;
}

export default function ChatContainer({ roomName }: MessageListProps) {
  const [limit, setLimit] = useState<number>(0);
  const { chatMessageList, loadHistoryChatMessage, historyChatMessageList } = useLoadMessage({ roomName, limit });

  const scrollRef = useRef<HTMLDivElement>(null);
  const fetchPointRef = useRef(null);
  const messageListRef = useRef<any>(null);
  const isVisible = useVisible(fetchPointRef);

  useEffect(() => {
    messageListRef.current?.scroll({ top: 500 });

    if (!scrollRef.current) return;

    const isAtBottom =
      messageListRef.current.scrollHeight - messageListRef.current.clientHeight <= messageListRef.current.scrollTop + 1;

    if (isAtBottom) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [historyChatMessageList]);

  useEffect(() => {
    if (historyChatMessageList && isVisible && limit <= historyChatMessageList.length) {
      loadHistoryChatMessage();
      setLimit(limit + 30);
    }
  }, [isVisible]);

  if (!historyChatMessageList) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-80px)]">
      <div className="w-full h-full px-5 overflow-scroll" ref={messageListRef}>
        <div ref={fetchPointRef} />
        <MessageList chatMessageList={chatMessageList} historyChatMessageList={historyChatMessageList} />
        <div ref={scrollRef} />
      </div>
      <ChatForm roomName={roomName} />
    </div>
  );
}

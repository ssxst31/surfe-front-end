import { useState, useEffect, useRef } from "react";

import useVisible from "hooks/useVisible";
import useMe from "hooks/useMe";
import ws from "datasources/ws";
import ChatForm from "pages/chats/_components/ChatForm";
import MessageList from "pages/chats/_components/MessageList";
import useLoadMessage from "pages/chats/_hooks/useLoadMessage";

interface MessageListProps {
  roomName: string;
}

export default function ChatContainer({ roomName }: MessageListProps) {
  const [limit, setLimit] = useState<number>(0);
  const { chatMessageList, loadHistoryChatMessage, historyChatMessageList } = useLoadMessage({ roomName, limit });

  if (!chatMessageList) {
    return <></>;
  }

  const scrollRef = useRef<HTMLDivElement>(null);
  const fetchPointRef = useRef(null);
  const messageListRef = useRef<any>(null);
  const isVisible = useVisible(fetchPointRef);
  const me = useMe();
  const [inputValue, setInputValue] = useState<string>("");

  if (!historyChatMessageList) {
    return <></>;
  }

  useEffect(() => {
    messageListRef.current?.scroll({ top: messageListRef.current.scrollHeight });
  }, [historyChatMessageList]);

  useEffect(() => {
    if (isVisible && limit <= historyChatMessageList.length) {
      loadHistoryChatMessage();
      setLimit(limit + 30);
    }
  }, [isVisible]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const postMessage = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();

    if (!inputValue) {
      return alert("메시지를 입력해주세요");
    }

    ws.emit("SEND_MESSAGE", {
      content: inputValue,
      memberId: me.id,
      createAt: new Date(),
      roomName,
    });

    setInputValue("");
  };

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-80px)]">
      <div className="w-full h-full px-5 overflow-scroll" ref={messageListRef}>
        <div ref={fetchPointRef} />
        <MessageList chatMessageList={chatMessageList} historyChatMessageList={historyChatMessageList} />
        <div ref={scrollRef} />
      </div>
      <ChatForm onChange={onChange} postMessage={postMessage} inputValue={inputValue} />
    </div>
  );
}

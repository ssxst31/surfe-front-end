import { useState, useEffect, useRef } from "react";

import useVisible from "hooks/useVisible";
import ChatForm from "pages/chats/_components/ChatForm";
import MessageList from "pages/chats/_components/MessageList";
import useLoadMessage from "pages/chats/_hooks/useLoadMessage";

import BottomArrowIcon from "assets/icons/bottomArrow.svg";

interface MessageListProps {
  roomName: string;
}

export default function ChatContainer({ roomName }: MessageListProps) {
  const [limit, setLimit] = useState<number>(0);
  const [isScrollToBottom, setIsScrollToBottom] = useState(false);
  const { chatMessageList, loadHistoryChatMessage, historyChatMessageList } = useLoadMessage({ roomName, limit });

  const scrollRef = useRef<HTMLDivElement>(null);
  const fetchPointRef = useRef(null);
  const messageListRef = useRef<any>(null);
  const isVisible = useVisible(fetchPointRef);

  useEffect(() => {
    messageListRef.current?.scroll({ top: 500 });
  }, [historyChatMessageList]);

  useEffect(() => {
    if (isScrollToBottom) {
      scrollRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [chatMessageList]);

  const handleScroll = () => {
    if (messageListRef.current) {
      const isAtBottom =
        messageListRef.current.scrollHeight - messageListRef.current.scrollTop === messageListRef.current.clientHeight;
      console.log(isAtBottom);
      if (isAtBottom) {
        setIsScrollToBottom(true);
      } else {
        setIsScrollToBottom(false);
      }
    }
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.addEventListener("scroll", handleScroll);

      return () => {
        if (messageListRef.current) {
          messageListRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [messageListRef, historyChatMessageList]);

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
    <div className="flex flex-col items-center w-full h-[calc(100vh-80px)] relative">
      <div className="w-full h-full px-5 overflow-scroll" ref={messageListRef}>
        <div ref={fetchPointRef} />
        <MessageList chatMessageList={chatMessageList} historyChatMessageList={historyChatMessageList} />
        <div ref={scrollRef} />
        {!isScrollToBottom && (
          <button
            className="absolute bottom-14 bg-blue-500 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-[50%] cursor-pointer"
            onClick={() => {
              scrollRef.current?.scrollIntoView({ behavior: "auto" });
            }}
          >
            <BottomArrowIcon color="white" />
          </button>
        )}
      </div>

      <ChatForm roomName={roomName} />
    </div>
  );
}

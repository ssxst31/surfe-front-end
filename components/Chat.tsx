import { useState, useEffect, useRef } from "react";

import useMe from "hooks/useMe";
import ws from "datasources/ws";
import { Chat } from "type";
import { createProfile } from "utils/profile";

export default function Chat2({ roomName }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const me = useMe();
  const [inputValue, setInputValue] = useState<string>("");
  const [chatList, setChatList] = useState<Chat[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    ws.on("RECEIVE_MESSAGE", (data: any) => {
      setChatList(data.chatList);
    });
  }, [ws, chatList]);

  useEffect(() => {
    ws.emit("JOIN_ROOM", {
      nickname: me.nickname,
      roomName,
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const postMessage = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();

    if (!inputValue) return alert("메시지를 입력해주세요");

    if (inputValue) {
      ws.emit("SEND_MESSAGE", {
        content: inputValue,
        memberId: me.id,
        createAt: new Date(),
        roomName,
      });

      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-216px)]">
      <div className="w-full h-full px-5 overflow-scroll">
        {chatList.map((chat, index) => {
          let hours = new Date(chat.createAt).getHours();
          let minutes = new Date(chat.createAt).getMinutes();

          if (chat.nickname === me.nickname) {
            return (
              <div key={index} className="flex justify-end w-full mb-2 space-x-4">
                <div className="flex flex-col-reverse text-xs">
                  {hours}:{minutes}
                </div>
                <div className="flex flex-col">
                  <div className="max-w-lg p-2  break-all bg-indigo-200 rounded-lg min-w-9 -lg:max-w-[12rem] -lg:text-xs text-sm">
                    {chat.content}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex w-full mb-2 space-x-4">
                <img
                  src={
                    chat.profile
                      ? `${createProfile()}` + chat.profile
                      : "https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
                  }
                  className="rounded-[50%] h-10 w-10"
                  alt="profile"
                />
                <div>
                  <div className="text-sm ">{chat.nickname}</div>
                  <div className="max-w-lg p-2 break-all bg-indigo-200 rounded-lg min-w-9 -lg:max-w-[12rem] -lg:text-xs text-sm">
                    {chat.content}
                  </div>
                </div>
                <div className="flex flex-col-reverse text-xs">
                  {hours}:{minutes}
                </div>
              </div>
            );
          }
        })}
        <div ref={scrollRef} />
      </div>
      <form className="relative flex w-full -lg:px-5" onSubmit={postMessage}>
        <div className="flex w-full px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 ">
          <input
            placeholder="메시지를 입력해주세요."
            className="w-full border-none focus:outline-none"
            onChange={onChange}
            value={inputValue}
          />
          <button>
            <img src="/send.png" className="ml-5 w-7 h-7" onClick={postMessage} />
          </button>
        </div>
      </form>
    </div>
  );
}

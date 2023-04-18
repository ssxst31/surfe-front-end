import { useState, useEffect, useRef } from "react";

import useMe from "hooks/useMe";
import ws from "datasources/ws";
import { Chat } from "type";

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
                  src="https://i.pinimg.com/236x/70/be/b2/70beb2f42ae1c4cfe7a32ec61a93c2f5.jpg"
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
      <form className="flex w-full -lg:px-5" onSubmit={postMessage}>
        <input
          placeholder="메시지를 입력해주세요."
          className="w-full px-2 py-3 mr-5 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          onChange={onChange}
          value={inputValue}
        />
        <button className="w-32 h-12 text-white bg-indigo-600 rounded-md" onClick={postMessage}>
          전송하기
        </button>
      </form>
    </div>
  );
}

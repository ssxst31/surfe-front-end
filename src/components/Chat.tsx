import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useMe from "hooks/useMe";
import ws from "datasources/ws";
import { Chat } from "type";
import { createProfile } from "utils/profile";
import Images from "assets/images";

interface ChatProps {
  roomName: string;
}

export default function Chat2({ roomName }: ChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const me = useMe();
  const [inputValue, setInputValue] = useState<string>("");
  const [chatList, setChatList] = useState<Chat[]>();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    ws.on("RECEIVE_MESSAGE", (data: { chatList: Chat[] }) => {
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
        memberId: me.user_id,
        createAt: new Date(),
        roomName,
      });

      setInputValue("");
    }
  };
  let lastDate = "";

  const createLastDate = (date: string) => {
    if (date !== lastDate) {
      lastDate = date;
      return lastDate;
    }
  };

  if (!chatList) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-55px)]">
      <div className="w-full h-full px-5 overflow-scroll">
        {chatList.map((chat, index) => {
          const createAt = new Date(chat.createAt);
          var month = createAt.getMonth() + 1;
          var day = createAt.getDate();
          var year = createAt.getFullYear();
          let hours = String(createAt.getHours()).padStart(2, "0");
          let minutes = String(createAt.getMinutes()).padStart(2, "0");

          const date = year + "년 " + month + "월 " + day + "일";

          if (chat.nickname === me.nickname) {
            return (
              <div key={index}>
                <div className="mx-auto text-sm text-center">{createLastDate(date)}</div>
                <div className="flex justify-end w-full mb-2 space-x-4">
                  <div className="flex flex-col-reverse text-xs">
                    {hours}:{minutes}
                  </div>
                  <div className="flex flex-col">
                    <div className="max-w-lg p-2  break-all bg-indigo-100 rounded-lg -lg:max-w-[12rem] -lg:text-xs text-sm after:content-[''] relative after:absolute after:border-transparent after:border-[16px] after:border-solid after:w-0 after:h-0 after:border-t-0 after:border-r-0 after:border-l-indigo-100 after:right-[-8px] after:top-3">
                      {chat.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex w-full mb-2 space-x-4">
                <Link
                  href={{
                    pathname: `/user/${chat.userId}`,
                  }}
                >
                  <img
                    src={
                      chat.profile
                        ? `${createProfile()}` + chat.profile
                        : "https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
                    }
                    className="rounded-[50%] h-10 w-10"
                    alt="profile"
                  />
                </Link>
                <div>
                  <div className="text-sm">{chat.nickname}</div>
                  <div className="max-w-lg p-2 break-all bg-gray-100 rounded-lg -lg:max-w-[12rem] -lg:text-xs text-sm before:content-[''] relative before:absolute before:border-transparent before:border-[16px] before:border-solid before:w-0 before:h-0 before:border-t-0 before:border-l-0 before:border-r-gray-100 before:left-[-8px]">
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
            <div className="relative ml-5 w-7 h-7">
              <Image src={Images.Send} fill onClick={postMessage} alt="send" />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

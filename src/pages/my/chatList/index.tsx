import React, { useState, useEffect } from "react";
import Link from "next/link";

import type { NextPage } from "next";
import * as myApi from "pages/api/my";
import useMe from "hooks/useMe";
import { Chat } from "type";

const ChatListPage: NextPage = () => {
  const me = useMe();
  const [chatList, setChatList] = useState<Chat[]>();

  const loadChatList = async () => {
    const res = await myApi.fetchChatList();

    setChatList(res);
  };

  useEffect(() => {
    loadChatList();
  }, []);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().substring(2, 4);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    let hour = date.getHours();
    const isPM = hour >= 12;
    if (hour > 12) {
      hour -= 12;
    }
    hour = Number(hour.toString().padStart(2, "0"));
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = isPM ? "오후" : "오전";

    const formattedDate = `${year}.${month}.${day} ${period} ${hour}:${minutes}`;
    return formattedDate;
  }

  if (!chatList) return <></>;

  return (
    <div>
      <div className="w-full p-3">
        <div className="space-y-5">
          {chatList.map((chat: any) => (
            <div key={chat.roomName}>
              <Link
                href={{
                  pathname: "/private-chat",
                  query: { room: chat.roomName.split("_").filter((item: any) => item !== String(me.id))[0] },
                }}
              >
                <div className="flex justify-between">
                  <div className="flex">
                    <img
                      src="https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
                      className="rounded-[50%] h-14 w-14 mr-4"
                      alt="profile"
                    />
                    <div>
                      <div>{chat.nickname}</div>
                      <div className="text-gray-400 ">{chat.lastMessage}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{formatDate(chat.updatedAt)}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatListPage;

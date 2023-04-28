import React, { useState, useEffect } from "react";
import Link from "next/link";

import type { NextPage } from "next";
import * as myApi from "pages/api/my";
import { createProfile } from "utils/profile";
import useMe from "hooks/useMe";

const ChatListPage: NextPage = () => {
  const me = useMe();
  const [chatList, setChatList] = useState();

  const loadChatList = async () => {
    const res = await myApi.fetchChatList();

    setChatList(res);
  };

  useEffect(() => {
    loadChatList();
  }, []);

  const dsa = (createAt: string) => {
    const createAt2 = new Date(createAt);
    var month = createAt2.getMonth() + 1;
    var day = createAt2.getDate();
    var year = createAt2.getFullYear();
    let hours = String(createAt2.getHours()).padStart(2, "0");
    let minutes = String(createAt2.getMinutes()).padStart(2, "0");
    return year + "년" + month + "월" + day + "일" + hours + ":" + minutes;
  };

  if (!chatList) return <></>;

  return (
    <div>
      <div className="w-full p-3">
        <div className="space-y-5">
          {chatList.map((chat: any) => (
            <div key={chat.roomName}>
              <Link
                href={{
                  pathname: "/privateChat",
                  query: { room: chat.roomName.split("_").filter((item: any) => item !== String(me.user_id))[0] },
                }}
              >
                <div className="flex justify-between">
                  <div className="flex">
                    <img
                      src={
                        chat.profile
                          ? `${createProfile()}` + chat.profile
                          : "https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
                      }
                      className="rounded-[50%] h-14 w-14 mr-4"
                      alt="profile"
                    />
                    <div>
                      <div>{chat.nickname}</div>
                      <div className="text-gray-400 ">{chat.content}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{dsa(chat.createAt)}</div>
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

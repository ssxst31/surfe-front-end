import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";

import * as apiMy from "pages/api/my";
import { createProfile } from "utils/profile";
import type { NextPage } from "next";

const FriendListPage: NextPage = () => {
  const [friendList, setFriendList] = useState<any>([]);
  const [friendRequestList, setFriendRequestList] = useState<any>([]);

  const postFriend = async (userId: any) => {
    try {
      const dsa = await apiMy.addFriend(userId);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const dsa = async () => {
    const dsa2 = await apiMy.fetchFriendList();
    const dsa22 = await apiMy.fetchFriendRequestList();

    setFriendList(dsa2);
    setFriendRequestList(dsa22);
  };

  useEffect(() => {
    dsa();
  }, []);

  return (
    <div>
      <div className="w-full">
        <Tab.Group>
          <Tab.List className="flex justify-between w-full">
            <Tab
              className={({ selected }) =>
                selected
                  ? " text-black w-1/2 border-blue-400 border-b-2 border-solid py-2"
                  : " text-gray-400 w-1/2 py-2 border-gray-200 border-b-2 border-solid"
              }
            >
              내 친구
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? " text-black w-1/2 border-blue-400 border-b-2 border-solid py-2"
                  : " text-gray-400 w-1/2 py-2 border-gray-200 border-b-2 border-solid"
              }
            >
              친구 요청
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="outline-none ring-white ring-opacity-60 ">
              <div className="flex">
                친구 <div className="font-bold text-blue-500">{friendList.length}</div>명
              </div>
              <ul>
                {friendList.map((friend: any) => (
                  <li key={friend.userId} className="relative flex justify-between p-3 rounded-md hover:bg-gray-100">
                    <div className="flex">
                      <Link
                        href={{
                          pathname: `/user/${friend.userId}`,
                        }}
                      >
                        <img
                          src={
                            friend.profile
                              ? `${createProfile()}` + friend.profile
                              : "https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
                          }
                          className="rounded-[50%] h-14 w-14 mr-4"
                          alt="profile"
                        />
                      </Link>
                      <div>
                        <div>
                          <span>{friend.nickname}</span>
                          <span className="text-gray-400"> {`(${friend.mbti})`}</span>
                        </div>
                        <div>{friend.introduce}</div>
                      </div>
                    </div>
                    <button
                      className="w-20 px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      onClick={() => {
                        alert("준비중입니다.");
                      }}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel className="outline-none ring-white ring-opacity-60 ">
              <div className="flex">
                요청 <div className="font-bold text-blue-500">{friendRequestList.length}</div>개
              </div>
              <ul>
                {friendRequestList.map((friend: any) => (
                  <li key={friend.id} className="relative flex justify-between p-3 rounded-md hover:bg-gray-100">
                    <div className="flex">
                      <img
                        src={
                          friend.profile
                            ? `${createProfile()}` + friend.profile
                            : "https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
                        }
                        className="rounded-[50%] h-14 w-14 mr-4"
                        alt="profile"
                      />
                      <div>
                        <div>
                          <span>{friend.nickname}</span>
                          <span className="text-gray-400"> {`(${friend.mbti})`}</span>
                        </div>
                        <div>{friend.introduce}</div>
                      </div>
                    </div>
                    <button
                      className="w-20 px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      onClick={() => {
                        postFriend(friend.userId);
                      }}
                    >
                      수락
                    </button>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default FriendListPage;

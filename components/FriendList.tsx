import React, { useState, useEffect } from "react";
import Link from "next/link";

import * as apiMy from "pages/api/my";
import { createProfile } from "utils/profile";

const FriendList = () => {
  const [friendList, setFriendList] = useState<any>([]);

  const loadFriendList = async () => {
    const res = await apiMy.fetchFriendList();

    setFriendList(res);
  };

  useEffect(() => {
    loadFriendList();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default FriendList;

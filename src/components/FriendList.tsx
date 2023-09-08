import React, { useState, useEffect } from "react";
import Link from "next/link";

import * as apiMy from "pages/api/my";
import { Friend } from "type/index";

const FriendList = () => {
  const [friendList, setFriendList] = useState<Friend[]>();

  const deleteFriend = async (friendId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await apiMy.deleteFriend(friendId);
      loadFriendList();
    }
  };

  const loadFriendList = async () => {
    const res = await apiMy.fetchFriendList();

    setFriendList(res);
  };

  useEffect(() => {
    loadFriendList();
  }, []);

  if (!friendList) return <></>;

  return (
    <div className="px-3 ">
      <div className="flex">
        친구 <div className="font-bold text-blue-500">{friendList.length}</div>명
      </div>
      <ul>
        {friendList.length > 0 ? (
          friendList.map((friend) => (
            <li key={friend.userId} className="relative flex justify-between py-3 rounded-md hover:bg-gray-100">
              <div className="flex">
                <Link
                  href={{
                    pathname: `/user/${friend.userId}`,
                  }}
                >
                  <img
                    src="https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
                    className="rounded-[50%] h-14 w-14 mr-4"
                    alt="profile"
                  />
                </Link>
                <div>
                  <div>
                    <span>{friend.nickname}</span>
                    <span className="text-gray-400"> {`(${friend.mbti})`}</span>
                  </div>
                  <div>{friend.statusMessage}</div>
                </div>
              </div>
              <button
                className="w-20 px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={() => {
                  deleteFriend(Number(friend.userId));
                }}
              >
                삭제
              </button>
            </li>
          ))
        ) : (
          <div className="mt-32 text-center text-gray-200">친구가 없습니다.</div>
        )}
      </ul>
    </div>
  );
};

export default FriendList;

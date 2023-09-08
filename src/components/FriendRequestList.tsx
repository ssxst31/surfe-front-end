import React, { useState, useEffect } from "react";

import * as apiMy from "pages/api/my";
import { Friend } from "type/index";

const FriendRequestList = () => {
  const [friendRequestList, setFriendRequestList] = useState<Friend[]>();

  const deleteFriend = async (friendId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await apiMy.deleteFriend(friendId);
      loadFriendRequestList();
    }
  };

  const loadFriendRequestList = async () => {
    const res = await apiMy.fetchFriendRequestList();

    setFriendRequestList(res);
  };

  useEffect(() => {
    loadFriendRequestList();
  }, []);

  if (!friendRequestList) return <></>;

  return (
    <div>
      <div className="flex px-3">
        보낸 요청 <div className="font-bold text-blue-500">{friendRequestList.length}</div>개
      </div>
      <ul>
        {friendRequestList.length > 0 ? (
          friendRequestList.map((friend) => (
            <li key={friend.userId} className="relative flex justify-between p-3 rounded-md hover:bg-gray-100">
              <div className="flex">
                <img
                  src="https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
                  className="rounded-[50%] h-14 w-14 mr-4"
                  alt="profile"
                />
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
                  deleteFriend(friend.userId);
                }}
              >
                취소
              </button>
            </li>
          ))
        ) : (
          <div className="mt-32 text-center text-gray-200">보낸 요청이 없습니다.</div>
        )}
      </ul>
    </div>
  );
};

export default FriendRequestList;

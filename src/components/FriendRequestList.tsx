import React, { useState, useEffect } from "react";

import * as apiMy from "pages/api/my";
import { createProfile } from "utils/profile";

const FriendRequestList = () => {
  const [friendRequestList, setFriendRequestList] = useState<any>([]);

  const postFriend = async (userId: any) => {
    try {
      apiMy.addFriend(userId);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const loadFriendRequestList = async () => {
    const res = await apiMy.fetchFriendRequestList();

    setFriendRequestList(res);
  };

  useEffect(() => {
    loadFriendRequestList();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default FriendRequestList;

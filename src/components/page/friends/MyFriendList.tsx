import React, { useState, useEffect } from "react";

import * as apiMy from "pages/api/my";
import { Friend } from "type/index";
import Avatar from "components/common/Avatar";
import FriendList from "components/page/friends/FriendList";

const MyFriendList = () => {
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

  return (
    <div>
      <div className="flex">
        친구
        <div className="font-bold text-blue-500">
          <span className="mx-0.5">{friendList?.length}</span>
        </div>
        명
      </div>
      <FriendList
        friendList={friendList}
        action={deleteFriend}
        actionTitle="삭제"
        fallbackText="연결된 친구가 없습니다."
      />
    </div>
  );
};

export default MyFriendList;

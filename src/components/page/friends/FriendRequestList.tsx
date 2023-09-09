import React, { useState, useEffect } from "react";

import * as apiMy from "pages/api/my";
import { Friend } from "type/index";
import Avatar from "components/common/Avatar";
import FriendList from "components/page/friends/FriendList";

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

  return (
    <div>
      <div className="flex">
        보낸 요청
        <div className="font-bold text-blue-500">
          <span className="mx-0.5">{friendRequestList?.length}</span>
        </div>
        개
      </div>
      <FriendList
        friendList={friendRequestList}
        action={deleteFriend}
        actionTitle="취소"
        fallbackText="보낸 요청이 없습니다."
      />
    </div>
  );
};

export default FriendRequestList;

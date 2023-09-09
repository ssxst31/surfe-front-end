import React, { useState, useEffect } from "react";

import * as apiMy from "pages/api/my";
import { Friend } from "type/index";
import Avatar from "components/common/Avatar";
import FriendList from "components/page/friends/FriendList";

const FriendReceiveList = () => {
  const [friendReceiveList, setFriendReceiveList] = useState<Friend[]>();

  const postFriend = async (userId: number) => {
    try {
      await apiMy.addFriend(userId);
      loadFriendReceiveList();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const loadFriendReceiveList = async () => {
    const res = await apiMy.fetchFriendReceiveList();

    setFriendReceiveList(res);
  };

  useEffect(() => {
    loadFriendReceiveList();
  }, []);

  return (
    <div>
      <div className="flex">
        받은 요청
        <div className="font-bold text-blue-500">
          <span className="mx-0.5">{friendReceiveList?.length}</span>
        </div>
        개
      </div>
      <FriendList
        friendList={friendReceiveList}
        action={postFriend}
        actionTitle="수락"
        fallbackText="받은 요청이 없습니다."
      />
    </div>
  );
};

export default FriendReceiveList;

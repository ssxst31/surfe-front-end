import FriendList from "components/page/friends/FriendList";
import useFriendRequestList from "components/page/friends/hooks/useFriendRequestList";

const FriendRequestList = () => {
  const { friendRequestList, deleteFriend } = useFriendRequestList();

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

import FriendList from "components/page/friends/FriendList";
import useFriendList from "components/page/friends/hooks/useFriendList";

const MyFriendList = () => {
  const { friendList, deleteFriend } = useFriendList();

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

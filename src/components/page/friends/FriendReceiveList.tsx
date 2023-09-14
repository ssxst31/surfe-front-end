import FriendList from "components/page/friends/FriendList";
import useFriendReceiveList from "components/page/friends/hooks/useFriendReceiveList";

const FriendReceiveList = () => {
  const { friendReceiveList, postFriend } = useFriendReceiveList();

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

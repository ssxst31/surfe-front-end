import Avatar from "components/common/Avatar";
import FriendSkeleton from "components/page/friends/FriendSkeleton";
import { Friend } from "type";

interface FriendListProps {
  friendList: Friend[] | undefined;
  action: (userId: number) => Promise<void>;
  actionTitle: string;
  fallbackText: string;
}

const FriendList = ({ friendList, action, actionTitle, fallbackText }: FriendListProps) => {
  if (!friendList)
    return (
      <div>
        {[1, 2, 3].map((item) => (
          <FriendSkeleton key={item} />
        ))}
      </div>
    );

  if (friendList.length === 0) {
    return <div className="mt-32 text-center text-gray-200">{fallbackText}</div>;
  }

  return (
    <ul>
      {friendList.map((friend: any) => (
        <li
          key={friend.userId}
          className="relative flex justify-between py-3 rounded-md hover:bg-gray-100 items-center"
        >
          <div className="flex">
            <Avatar pathName={`/user/${friend.userId}`} width="w-14" height="h-14" />
            <div>
              <div>
                <span>{friend.nickname}</span>
                <span className="text-gray-400">{`(${friend.mbti})`}</span>
              </div>
              <div className="whitespace-nowrap text-ellipsis overflow-hidden w-44">{friend.statusMessage}</div>
            </div>
          </div>
          <button
            className="w-20 px-4 h-8 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={() => {
              action(friend.userId);
            }}
          >
            {actionTitle}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FriendList;

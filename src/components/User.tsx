import Link from "next/link";

import * as myApi from "pages/api/my";
import { NearUser } from "type/index";
import Avatar from "components/common/Avatar";

interface UserProps {
  user: NearUser;
  loadNearUserList: () => Promise<void>;
}

export default function User2({ user, loadNearUserList }: UserProps) {
  const addFriend = async () => {
    try {
      await myApi.addFriend(user.id);
      await loadNearUserList();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const deleteFriend = async () => {
    try {
      await myApi.deleteFriend(user.id);
      await loadNearUserList();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <Avatar pathName={`/user/${user.id}`} width="w-12" height="h-12" image={user.profileImage} />
        <div className="mr-4 text-sm  break-all break-words">
          {user.nickname}
          <div className="mr-4 text-sm text-gray-400 break-all break-words">{user.statusMessage}</div>
        </div>
      </div>
      {user.friendStatus === "requesting" && (
        <button
          className="h-8 px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={deleteFriend}
        >
          요청완료
        </button>
      )}
      {user.friendStatus === "other" && (
        <button
          className="h-8 px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={addFriend}
        >
          친구요청
        </button>
      )}
      {user.friendStatus === "friend" && (
        <Link
          href={{
            pathname: `/chats/${user.id}`,
          }}
        >
          <button className="px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            1대1채팅
          </button>
        </Link>
      )}
      {user.friendStatus === "requested" && (
        <button
          className="h-8 px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={addFriend}
        >
          요청받음
        </button>
      )}
    </div>
  );
}

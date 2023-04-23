import Link from "next/link";

import { createProfile } from "utils/profile";
import { addFriend, deleteFriend } from "pages/api/my";
import { User } from "type/index";

interface UserProps {
  user: User;
  loadUserList: any;
}

export default function User2({ user, loadUserList }: UserProps) {
  const postFriend = async () => {
    try {
      await addFriend(String(user.id));
      await loadUserList();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const deleteFriend2 = async () => {
    try {
      await deleteFriend(user.id);
      await loadUserList();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <Link
          href={{
            pathname: `/user/${user.id}`,
          }}
        >
          <img
            src={
              user.profile
                ? `${createProfile()}` + user.profile
                : "https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
            }
            className="rounded-[50%] h-12 w-12 shadow-2xl mr-2 cursor-pointer"
            alt="profile"
          />
        </Link>
        <div className="mr-4 text-sm w-[82px] break-all break-words">{user.nickname}</div>
      </div>
      {user.friendStatus === "requesting" && (
        <button
          className="h-8 px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={deleteFriend2}
        >
          요청완료
        </button>
      )}
      {user.friendStatus === "other" && (
        <button
          className="h-8 px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={postFriend}
        >
          친구요청
        </button>
      )}
      {user.friendStatus === "friend" && (
        <Link
          href={{
            pathname: "/privateChat",
            query: { room: user.id },
          }}
        >
          <button className="px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            1대1채팅
          </button>
        </Link>
      )}
    </div>
  );
}

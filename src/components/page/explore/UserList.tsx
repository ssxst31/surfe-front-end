import UserSkeleton from "components/page/explore/UserSkeleton";
import User from "components/User";
import { NearUser } from "type";

interface UserListProps {
  nearUserList: NearUser[] | undefined;
  reloadNearUserList: () => Promise<void>;
}

export default function UserList({ nearUserList, reloadNearUserList }: UserListProps) {
  if (!nearUserList)
    return (
      <div className="space-y-3 mt-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <UserSkeleton key={item} />
        ))}
      </div>
    );

  if (nearUserList.length === 0) {
    return <div className="text-center">없습니다.</div>;
  }

  return (
    <div className="max-h-[328px] overflow-y-scroll space-y-3 mt-2">
      {nearUserList.map((user) => (
        <User key={user.id} user={user} reloadNearUserList={reloadNearUserList} />
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { fetchUserListByMeDistance } from "pages/api/users";

import { NearUser } from "type";
import User from "components/User";

export default function Explore() {
  const [userList, setUserList] = useState<NearUser[]>();

  useEffect(() => {
    loadUserList();
  }, []);

  const loadUserList = async () => {
    const res = await fetchUserListByMeDistance();
    setUserList(res);
  };

  if (!userList) {
    return <div></div>;
  }

  if (userList.length === 0) {
    return <div className="text-center">없습니다.</div>;
  }

  return (
    <div className="max-h-[328px] overflow-y-scroll space-y-3 mt-2">
      {userList.map((user: any) => (
        <User key={user.id} user={user} loadUserList={loadUserList} />
      ))}
    </div>
  );
}

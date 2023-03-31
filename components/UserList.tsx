import { useEffect, useState } from "react";
import Link from "next/link";

import { fetchUserListByMeDistance } from "pages/api/user";
import KakaoMap from "components/KakaoMap";
import useMe from "hooks/useMe";

export default function UserList() {
  const me = useMe();

  const [userList, setUserList] = useState<any>([]);

  useEffect(() => {
    loadUserList();
  }, []);

  const loadUserList = async () => {
    const res = await fetchUserListByMeDistance();

    setUserList(res.userList);
  };

  return (
    <div className="flex flex-col">
      <KakaoMap userListCount={userList.length} myLat={Number(me?.lat)} myLng={Number(me?.lng)} />
      <div className="flex flex-col mt-8 -sm:px-3">
        <div className="text-lg font-extrabold">마음에 드는 사람에게 말을 걸어보세요!</div>
        {userList.map((item: any) => (
          <div key={item.id} className="flex items-center">
            <img src="/defaultProfile.png" className="rounded-[50%] h-22 w-22 shadow-2xl" alt="profile" />
            <div className="mr-4 text-lg">{item.nickname}</div>
            <Link
              href={{
                pathname: "/privateChat",
                query: { room: item.id },
              }}
            >
              <button>1대1채팅하기</button>
            </Link>
          </div>
        ))}
        <div className="text-lg font-extrabold">대화할 사람이 없나요?</div>
        <Link
          href={{
            pathname: "/everyChat",
          }}
        >
          <button className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 w-full">
            단체 채팅
          </button>
        </Link>
      </div>
    </div>
  );
}

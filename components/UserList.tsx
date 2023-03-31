import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { fetchUserListByMeDistance } from "pages/api/user";
import KakaoMap from "components/KakaoMap";
import useMe from "hooks/useMe";

export default function UserList() {
  const router = useRouter();
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
      <div className="flex flex-col mt-8 space-y-3 -sm:px-3">
        <div className="text-lg font-extrabold">마음에 드는 사람에게 말을 걸어보세요!</div>
        {userList.map((item: any) => (
          <div key={item.id}>
            <div className="flex justify-between">
              <div className="flex">
                <img
                  src="https://i.pinimg.com/236x/70/be/b2/70beb2f42ae1c4cfe7a32ec61a93c2f5.jpg"
                  className="rounded-[50%] h-16 w-16 shadow-2xl mr-2 cursor-pointer"
                  alt="profile"
                  onClick={() => {
                    router.push("/user/1");
                  }}
                />
                <div className="mr-4 text-lg">{item.nickname}</div>
              </div>
              <Link
                href={{
                  pathname: "/privateChat",
                  query: { room: item.id },
                }}
              >
                <button className="w-full px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  1대1채팅하기
                </button>
              </Link>
            </div>
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

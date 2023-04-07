import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { fetchUserListByMeDistance } from "pages/api/user";
import { addLocation } from "pages/api/my";
import KakaoMap from "components/KakaoMap";
import useMe from "hooks/useMe";
import useGeolocation from "hooks/useGeolocation";

export default function UserList() {
  const router = useRouter();
  const me = useMe();

  const [userList, setUserList] = useState<any>([]);
  const location = useGeolocation();

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
      <div className="flex flex-col mt-8 space-y-3 -sm:px-5">
        <button
          disabled={!location.loaded}
          onClick={async () => {
            if (location.error?.code === 1) {
              return alert("위치 액세스를 허용해 주세요.");
            }
            await addLocation(location.coordinates?.lat, location.coordinates?.lng);

            window.location.href = "/userList";
          }}
          className={`${
            location.loaded ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-100 cursor-default"
          } text-white font-medium rounded-lg text-sm px-5 py-2.5 w-32`}
        >
          위치 업데이트
        </button>
        <div className="text-lg font-extrabold">마음에 드는 사람에게 말을 걸어보세요!</div>
        {userList.length === 0 && (
          <div className="text-center">주위에 아무도 없네요 위치 업데이트 버튼으로 새로고침해보세요</div>
        )}
        {userList.map((item: any) => (
          <div key={item.id}>
            <div className="flex justify-between">
              <div className="flex">
                <img
                  src="https://i.pinimg.com/236x/70/be/b2/70beb2f42ae1c4cfe7a32ec61a93c2f5.jpg"
                  className="rounded-[50%] h-16 w-16 shadow-2xl mr-2 cursor-pointer"
                  alt="profile"
                  onClick={() => {
                    router.push(`/user/${item.id}`);
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
        <div className="text-lg font-extrabold">단체 채팅도 한번 둘러보세요!</div>
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

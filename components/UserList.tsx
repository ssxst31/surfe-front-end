import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { fetchUserListByMeDistance } from "pages/api/user";
import { addLocation } from "pages/api/my";
import KakaoMap from "components/KakaoMap";
import useMe from "hooks/useMe";
import useGeolocation from "hooks/useGeolocation";
import User from "components/User";

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
    <div className="relative lg:flex w-[620px] mt-10 -lg:mx-auto -lg:w-full">
      <div className="flex flex-col w-full">
        <KakaoMap userListCount={userList.length} myLat={Number(me?.lat)} myLng={Number(me?.lng)} />
        <div className="flex justify-end mt-6">
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
            } text-white font-medium rounded-lg text-sm px-5 py-2.5 w-32 lg:mb-44`}
          >
            위치 업데이트
          </button>
        </div>
      </div>
      <div className="lg:fixed right-[calc(50vw-450px)] -lg:px-5">
        <div className="flex -lg:hidden">
          <img
            src="https://i.pinimg.com/236x/70/be/b2/70beb2f42ae1c4cfe7a32ec61a93c2f5.jpg"
            className="rounded-[50%] h-12 w-12 shadow-2xl mr-2 cursor-pointer"
          />
          <div>
            <div className="text-sm">{me.nickname}</div>
            <div className="text-sm">{me.introduce}</div>
          </div>
        </div>
        <div className="pt-5 mt-5 font-extrabold border-t border-gray-100 border-solid text-md">
          마음에 드는 사람에게 말을 걸어보세요!
        </div>
        {userList.length === 0 ? (
          <div className="text-center">위치 업데이트 버튼으로 새로고침해보세요</div>
        ) : (
          <div className="h-[343px] overflow-y-scroll space-y-3 mt-2">
            {userList.map((user: any) => (
              <User key={user.id} user={user} />
            ))}
          </div>
        )}
        <div className="pt-5 my-2 font-extrabold border-t border-gray-100 border-solid text-md">
          단체 채팅도 한번 둘러보세요!
        </div>
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

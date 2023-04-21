import { useEffect, useState } from "react";
import Link from "next/link";

import { fetchUserListByMeDistance } from "pages/api/user";
import { addLocation } from "pages/api/my";
import KakaoMap from "components/KakaoMap";
import useMe from "hooks/useMe";
import useGeolocation from "hooks/useGeolocation";
import User from "components/User";
import { createProfile } from "utils/profile";

export default function UserList() {
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
            } text-white font-medium rounded-lg text-sm px-5 py-2.5 w-32 lg:mb-44 -lg:mr-5 -lg:mb-5`}
          >
            위치 업데이트
          </button>
        </div>
      </div>
      <div className="lg:fixed right-[calc(50vw-450px)] -lg:px-5 w-[256px] -lg:w-auto">
        <div className="flex justify-between -lg:hidden">
          <div className="flex">
            <img
              src={
                me.profile
                  ? `${createProfile()}` + me.profile
                  : "https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
              }
              className="rounded-[50%] h-12 w-12 shadow-2xl mr-2"
            />
            <div>
              <div className="text-sm">{me.nickname}</div>
              <div className="text-sm">{me.introduce}</div>
            </div>
          </div>
          <Link
            href={{
              pathname: "/setting/profile",
            }}
          >
            <button className="w-full px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              내 프로필 수정
            </button>
          </Link>
        </div>
        <Link
          href={{
            pathname: "/my/friendList",
          }}
        >
          <button className="w-full px-4 py-2 my-5 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 -lg:hidden">
            친구 관리
          </button>
        </Link>
        <div className="pt-5 font-extrabold border-t border-gray-100 border-solid text-md">
          주변 사람과 채팅해 보세요🙌
        </div>
        {userList.length === 0 ? (
          <div className="text-center">없습니다.</div>
        ) : (
          <div className=" max-h-[343px] overflow-y-scroll space-y-3 mt-2">
            {userList.map((user: any) => (
              <User key={user.id} user={user} />
            ))}
          </div>
        )}
        <div className="pt-5 my-2 font-extrabold border-t border-gray-100 border-solid text-md">
          단체 채팅도 한번 둘러보세요✨
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

"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";

import { getDistance } from "app/utils/map";
import { meState } from "app/store";
import { fetchUserList } from "app/api/user";
import { logOut } from "app/api/auth";
import KakaoMap from "app/components/KakaoMap";

export default function Main({ profile }: any) {
  const [me, setMe] = useRecoilState(meState);
  const [userList, setUserList] = useState<any>([]);

  useEffect(() => {
    setMe(profile);
    loadUserList();
  }, []);

  const loadUserList = async () => {
    const res = await fetchUserList();

    setUserList(res.data);
  };

  const signOut = async () => {
    await logOut();
    return location.reload();
  };

  const pins = userList
    .filter((el: any) => el.email !== me.email)
    .map((el: any) => ({
      id: el.id,
      lat: el.lat,
      lng: el.lng,
    }));

  return (
    <div className="flex flex-col">
      <button onClick={signOut}>로그아웃</button>
      <KakaoMap pins={pins} myLat={Number(me.lat)} myLng={Number(me.lng)} />
      <div className="text-lg font-extrabold">마음에 드는 사람에게 말을 걸어보세요!</div>
      {userList
        .filter((el: any) => el.email !== me.email)
        .map((item: any) => {
          if (getDistance(Number(me.lat), Number(me.lng), item.lat, item.lng) / 1000 < 5) {
            return (
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
            );
          }
        })}
      <div className="text-lg font-extrabold">대화할 사람이 없나요?</div>
      <Link
        href={{
          pathname: "/chat",
        }}
      >
        <button className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 w-full">
          단체 채팅
        </button>
      </Link>
    </div>
  );
}

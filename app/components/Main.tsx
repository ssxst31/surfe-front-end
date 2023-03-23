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
      회원리스트입니다.
      {userList
        .filter((el: any) => el.email !== me.email)
        .map((item: any) => {
          if (getDistance(Number(me.lat), Number(me.lng), item.lat, item.lng) / 1000 < 5) {
            return (
              <div key={item.id} className="flex">
                <div className="mr-4">{item.nickname}</div>
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
      <Link
        href={{
          pathname: "/chatList",
        }}
      >
        <button>채팅목록</button>
      </Link>
      <Link
        href={{
          pathname: "/chat",
        }}
      >
        <button>채팅하러가기</button>
      </Link>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { getDistance } from "app/utils/map";
import { meState } from "app/store";
import { fetchUserList } from "app/api/user";
import { logOut } from "app/api/auth";
import KakaoMap from "app/components/KakaoMap";

export default function Main({ profile }: any) {
  const router = useRouter();

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

  const goChatPage = () => {
    router.push("/chat");
  };

  const goPrivateChatPage = () => {
    router.push("/privateChat");
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
                <button onClick={goPrivateChatPage}>1대1채팅하기</button>
              </div>
            );
          }
        })}
      <button onClick={goChatPage}>채팅하러가기</button>
    </div>
  );
}

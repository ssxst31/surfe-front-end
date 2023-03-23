"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { meState } from "app/store";
import { fetchUserList } from "app/api/user";
import { logOut } from "app/api/auth";
import KakaoMap from "app/components/KakaoMap";

export default function Main({ profile }: any) {
  const router = useRouter();

  const setMe = useSetRecoilState(meState);
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

  return (
    <div className="flex flex-col">
      <button onClick={signOut}>로그아웃</button>
      <KakaoMap />
      회원리스트입니다.
      {userList.map((el: any) => (
        <div key={el.id} className="flex">
          <div className="mr-4">{el.nickname}</div>
          <button onClick={goPrivateChatPage}>1대1채팅하기</button>
        </div>
      ))}
      <button onClick={goChatPage}>채팅하러가기</button>
    </div>
  );
}

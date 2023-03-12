"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { meState } from "app/store";

export default function Main({ profile }: any) {
  const setMe = useSetRecoilState(meState);

  useEffect(() => {
    setMe(profile);
  }, []);

  const router = useRouter();

  const goChatPage = () => {
    router.push("/chat");
  };

  return (
    <div className="flex flex-col">
      <button onClick={goChatPage}>채팅하러가기</button>
    </div>
  );
}

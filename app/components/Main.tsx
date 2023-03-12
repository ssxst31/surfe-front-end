"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

import { meState } from "app/store";

export default function Main({ profile }: any) {
  const [me, setMe] = useRecoilState(meState);

  useEffect(() => {
    setMe(profile);
  }, []);

  const router = useRouter();

  const goWs = () => {
    router.push("/ws");
  };

  return (
    <div className="flex flex-col">
      <button onClick={goWs}>채팅하러가기</button>
    </div>
  );
}

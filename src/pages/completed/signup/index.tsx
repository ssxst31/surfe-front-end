import React from "react";
import Link from "next/link";

import useMe from "hooks/useMe";
import Particle from "components/common/Particle";

export default function CompletedSignUpPage() {
  const { me } = useMe();

  return (
    <div className=" h-screen bg-gradient-to-t from-blue-500 to-indigo-500">
      <div className="flex flex-col items-center pt-60">
        <Particle />
        <div className="text-center text-white">
          <span className="font-bold text-white">{me?.nickname}</span>님 서피 회원이 되신 것을 환영합니다 🙌
          <div>지금 근처 사람들과 채팅해보세요!</div>
        </div>
        <Link href="/explore">
          <button className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-4 mt-10 -lg:w-64 -lg:mx-auto border-white bg-transparent border-solid border">
            메인으로 이동하기
          </button>
        </Link>
      </div>
    </div>
  );
}

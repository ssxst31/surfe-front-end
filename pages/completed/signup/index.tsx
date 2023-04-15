import React from "react";
import Link from "next/link";

import useMe from "hooks/useMe";
import Particle from "components/Particle";

export default function CompletedSignUpPage() {
  const me = useMe();

  return (
    <div className="flex flex-col items-center mt-24">
      <Particle />
      <div className="text-center ">
        <span className="font-bold">{me?.nickname}</span>님 서피 회원이 되신 것을 환영합니다 🙌
        <div>지금 다른 사람들과 채팅해보세요!</div>
      </div>
      <Link href="/">
        <button className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 mt-10 -lg:w-64 -lg:mx-auto">
          메인으로 이동하기
        </button>
      </Link>
    </div>
  );
}

import React from "react";
import Link from "next/link";

import useMe from "hooks/useMe";
import Particle from "components/Particle";

export default function CompletedSignUpPage() {
  const me = useMe();

  return (
    <div className="flex flex-col items-center h-screen">
      <Particle />
      <div>
        <span className="font-bold">{me?.nickname}</span>님 회원가입을 축하드립니다 🙌
        <div>지금 다른 사람들을 만나러 가볼까요~~!</div>
      </div>
      <Link href="/">
        <button>메인으로 이동하기</button>
      </Link>
    </div>
  );
}

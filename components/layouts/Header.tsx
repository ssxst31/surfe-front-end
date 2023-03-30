import React from "react";
import Link from "next/link";

import useMe from "hooks/useMe";
import { logOut } from "pages/api/auth";

export default function Header() {
  const me = useMe();

  const signOut = async () => {
    await logOut();
    return location.reload();
  };

  return (
    <div className="fixed  inline-flex justify-between w-full bg-blue-400 h-14 z-[2] -sm:px-3 px-10 items-center">
      <Link href="/">
        <img src="/logo.png" className="h-9 w-9" />
      </Link>
      {me ? (
        <div>
          {`${me.nickname} (${me.email})`}
          <button onClick={signOut}>로그아웃</button>
        </div>
      ) : (
        <Link href="/">
          <button className="p-1 text-white w-14">로그인</button>
        </Link>
      )}
    </div>
  );
}

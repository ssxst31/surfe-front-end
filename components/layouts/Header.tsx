import React from "react";
import Link from "next/link";

import { logOut } from "pages/api/auth";

export default function Header({ setIsSidebar, me }: any) {
  const signOut = async () => {
    await logOut();

    window.location.href = "/";
  };

  return (
    <div className="fixed w-full bg-blue-400 z-[2] -lg:px-5 shadow-xl text-center">
      <div className="inline-flex items-center justify-between w-full max-w-4xl mx-auto h-14">
        <Link href="/">
          <img src="/title2.png" width={96} height={96} />
        </Link>
        <div className="flex">
          {me ? (
            <button className="text-white -lg:hidden" onClick={signOut}>
              로그아웃
            </button>
          ) : (
            <Link href="/">
              <button className="block p-1 text-white w-14 -lg:hidden">로그인</button>
            </Link>
          )}
          <img
            src="/hamburgerMenu.png"
            width={20}
            height={20}
            className="hidden -lg:block"
            onClick={() => {
              setIsSidebar((prev: boolean) => !prev);
            }}
          />
        </div>
      </div>
    </div>
  );
}

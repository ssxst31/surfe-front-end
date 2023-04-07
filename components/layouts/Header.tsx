import React from "react";
import Link from "next/link";

import { logOut } from "pages/api/auth";

export default function Header({ setIsSidebar, me }: any) {
  const signOut = async () => {
    await logOut();

    window.location.href = "/";
  };

  return (
    <div className="fixed inline-flex justify-between w-full bg-blue-400 h-14 z-[2] -sm:px-5 px-10 items-center shadow-xl">
      <Link href="/">
        <img src="/logo.png" className="h-9 w-9" />
      </Link>
      <div className="flex">
        {me ? (
          <div className="flex items-center text-white -sm:hidden">
            <img
              src="https://i.pinimg.com/236x/70/be/b2/70beb2f42ae1c4cfe7a32ec61a93c2f5.jpg"
              className="rounded-[50%] h-10 w-10 mr-2"
              alt="profile"
            />
            {me.nickname}
            <button onClick={signOut}>로그아웃</button>
          </div>
        ) : (
          <Link href="/">
            <button className="block p-1 text-white w-14 -sm:hidden">로그인</button>
          </Link>
        )}
        <img
          src="/hamburgerMenu.png"
          width={20}
          height={20}
          className="hidden -sm:block"
          onClick={() => {
            setIsSidebar((prev: boolean) => !prev);
          }}
        />
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { logOut } from "pages/api/auth";
import { Me } from "type";
import Images from "assets/images";

interface HeaderProps {
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  me: Me;
}

export default function Header({ setIsSidebar, me }: HeaderProps) {
  const signOut = async () => {
    await logOut();

    window.location.href = "/";
  };

  return (
    <div className="fixed w-full bg-blue-400 z-[2] -lg:px-5 shadow-xl text-center ">
      <div className="inline-flex items-center justify-between w-full max-w-4xl mx-auto">
        <Link href="/">
          <div className="relative w-24 h-14">
            <Image src={Images.WhiteTitle} alt="logo" fill />
          </div>
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

          <Image
            src={Images.HamburgerMenu}
            alt="logo"
            onClick={() => {
              setIsSidebar((prev: boolean) => !prev);
            }}
            className="hidden -lg:block"
          />
        </div>
      </div>
    </div>
  );
}

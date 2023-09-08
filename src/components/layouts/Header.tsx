import React from "react";
import Link from "next/link";
import Image from "next/image";

import HamburgerIcon from "assets/icons/hamburger.svg";
import { Me } from "type";
import { logOut } from "pages/api/auth";
import Logo from "components/Logo";
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
    <div className="fixed w-full bg-blue-400 z-[2] -lg:px-3 shadow-xl text-center py-3">
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
        <Link href="/">
          <Logo className="text-white text-3xl" />
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
          <HamburgerIcon
            onClick={() => {
              setIsSidebar((prev: boolean) => !prev);
            }}
            color="white"
            className="hidden -lg:block"
          />
        </div>
      </div>
    </div>
  );
}

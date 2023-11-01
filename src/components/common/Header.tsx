import React from "react";
import Link from "next/link";

import { Me } from "type";
import Logo from "components/common/Logo";
import Avatar from "components/common/Avatar";

interface HeaderProps {
  me: Me;
}

export default function Header({ me }: HeaderProps) {
  return (
    <div className="fixed w-full bg-gradient-to-l from-blue-500 to-indigo-500 z-[2] -lg:px-3 shadow-xl text-center py-3">
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
        <Link href="/">
          <Logo className="text-white text-3xl" />
        </Link>
        <div className="flex">
          <Avatar pathName="/setting/profile" width="w-8" height="h-8" image={me.profileImage} />
        </div>
      </div>
    </div>
  );
}

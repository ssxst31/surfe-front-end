import React, { ReactNode } from "react";
import Link from "next/link";

import PencilIcon from "assets/icons/pencil.svg";

interface AvatarProps {
  width: string;
  height: string;
  pathName?: string;
  children?: ReactNode;
}

export default function Avatar({ width, height, pathName, children }: AvatarProps) {
  return (
    <Link
      href={{
        pathname: pathName,
      }}
      className="relative cursor-pointer"
    >
      <img
        src="https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
        className={`rounded-[50%] ${width} ${height} shadow-2xl mr-2`}
      />
      {children}
    </Link>
  );
}

import React, { ReactNode } from "react";
import Link from "next/link";

import PencilIcon from "assets/icons/pencil.svg";

interface AvatarProps {
  width: string;
  height: string;
  pathName?: string;
  children?: ReactNode;
  image: string;
}

export default function Avatar({ width, height, pathName, children, image }: AvatarProps) {
  return (
    <Link
      href={{
        pathname: pathName,
      }}
      className="relative cursor-pointer"
    >
      <img src={image} width="100%" className={`rounded-[50%] ${width} ${height} shadow-2xl mr-2`} />
      {children}
    </Link>
  );
}

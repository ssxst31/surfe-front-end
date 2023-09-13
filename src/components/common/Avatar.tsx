import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

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
      <Image
        src={image}
        alt="profile_image"
        width={50}
        height={50}
        className={`rounded-[50%] ${width} ${height} shadow-2xl mr-2`}
      />
      {children}
    </Link>
  );
}

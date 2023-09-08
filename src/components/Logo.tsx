import React from "react";
import { Marhey } from "next/font/google";

const aBeeZee = Marhey({ weight: "400", preload: false });

interface HeaderProps {
  className: string;
}

export default function Logo({ className }: HeaderProps) {
  return <div className={`${aBeeZee.className} ${className}`}>surfe</div>;
}

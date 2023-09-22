import React from "react";

interface HeaderProps {
  className: string;
}

export default function Logo({ className }: HeaderProps) {
  return <div className={`${className} font-marhey`}>surfe</div>;
}

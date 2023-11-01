import React, { useState } from "react";
import Link from "next/link";

import { logOut } from "pages/api/auth";
import Header from "components/common/Header";
import MobileBottomNav from "components/common/MobileBottomNav";
import useMe from "hooks/useMe";
import Avatar from "components/common/Avatar";

interface ResponsiveContainerProps {
  children: JSX.Element | JSX.Element[];
}

export default function ResponsiveContainer({ children }: ResponsiveContainerProps) {
  const { me } = useMe();

  const signOut = async () => {
    await logOut();

    window.location.href = "/";
  };

  return (
    <div className="h-screen">
      {me && <Header me={me} />}
      <div className="w-full h-[60px]" />
      <div className="max-w-4xl mx-auto">{children}</div>
      <MobileBottomNav />
    </div>
  );
}

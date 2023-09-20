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
  const me = useMe();

  const [isSidebar, setIsSidebar] = useState<boolean>(false);

  const signOut = async () => {
    await logOut();

    window.location.href = "/";
  };

  return (
    <div className="h-screen">
      {isSidebar && (
        <div
          className={`hidden -lg:block fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50`}
          style={{
            transition: "all 0.3s ease-out",
          }}
          onClick={() => {
            setIsSidebar((prev) => !prev);
          }}
        >
          <div
            className="absolute top-0 bottom-0 left-0 z-10 w-64 h-full p-4 bg-white"
            style={{
              transition: "all 0.3s ease-out",
              left: isSidebar ? "0" : "100%",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {me && (
              <div className="text-black">
                <div className="flex items-center my-4">
                  <Avatar image={me.profileImage} width="w-12" height="h-12" />
                  <div>
                    <div className="text-sm">{me.nickname}</div>
                    <div className="text-xs">{me.id}</div>
                    <div className="text-xs">{me.statusMessage}</div>
                    <div className="text-xs">{me.mbti}</div>
                  </div>
                </div>
                <div className="flex flex-col mt-2 space-y-2">
                  <Link
                    href={{
                      pathname: "/setting/profile",
                    }}
                  >
                    <button
                      className="w-32 py-1 text-base text-white bg-blue-500 rounded-lg"
                      onClick={() => {
                        setIsSidebar(false);
                      }}
                    >
                      내 프로필 수정
                    </button>
                  </Link>
                  <Link
                    href={{
                      pathname: "/my/friends",
                    }}
                  >
                    <button className="w-32 py-1 text-base text-white bg-blue-500 rounded-lg">친구 관리</button>
                  </Link>
                  <button onClick={signOut} className="w-32 py-1 text-base text-white bg-blue-500 rounded-lg">
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {me && <Header setIsSidebar={setIsSidebar} me={me} />}
      <div className="w-full h-[60px]" />
      <div className="max-w-4xl mx-auto">{children}</div>
      <MobileBottomNav />
    </div>
  );
}

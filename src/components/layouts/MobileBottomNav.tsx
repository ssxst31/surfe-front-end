import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import HomeIcon from "assets/icons/home.svg";
import MessageIcon from "assets/icons/message.svg";
import UserIcon from "assets/icons/user.svg";
import SettingIcon from "assets/icons/setting.svg";

export default function MobileBottomNav() {
  const router = useRouter();
  const currentPage = router.pathname;
  const notPublicPages = ["/", "private-chat", "every-chat", "signup", "completed"];
  const pageRootName = currentPage !== "/" ? currentPage.slice(1).split("/")[0] : "/";

  const activeNavPage = !notPublicPages.includes(pageRootName);

  const navList = [
    {
      pathname: "/explore",
      title: "홈",
      icon: <HomeIcon color={currentPage === "/explore" ? "#2563EB" : "black"} />,
    },
    {
      pathname: "/my/friendList",
      title: "친구 관리",
      icon: <UserIcon color={currentPage === "/my/friendList" ? "#2563EB" : "black"} />,
    },
    {
      pathname: "/my/chatList",
      title: "채팅 목록",
      icon: <MessageIcon color={currentPage === "/my/chatList" ? "#2563EB" : "black"} />,
    },
    {
      pathname: "/setting/profile",
      title: "내 프로필",
      icon: <SettingIcon color={currentPage === "/setting/profile" ? "#2563EB" : "black"} />,
    },
  ];

  return activeNavPage ? (
    <div>
      <div className="h-[69px]" />
      <div className="fixed w-full bg-white z-[2] -lg:px-3 shadow-xl text-center py-3 bottom-0 lg:hidden  border-t border-solid border-gray-200">
        <ul className="flex justify-between w-full max-w-4xl mx-auto">
          {navList.map((item) => (
            <li className="text-xs w-14" key={item.title}>
              <Link
                href={{
                  pathname: item.pathname,
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  {item.icon}
                  <div className={`${currentPage === item.pathname ? "text-blue-500" : "test-black"} mt-1`}>
                    {item.title}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
}

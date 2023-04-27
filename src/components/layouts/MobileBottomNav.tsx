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
  const notPublicPages = ["/", "privateChat", "everyChat"];
  const pageRootName = currentPage !== "/" ? currentPage.slice(1).split("/")[0] : "/";

  const activeNavPage = !notPublicPages.includes(pageRootName);

  return activeNavPage ? (
    <div>
      <div className="h-[61px]" />
      <div className="fixed w-full bg-white z-[2] -lg:px-5 shadow-xl text-center py-3 bottom-0 lg:hidden  border-t border-solid border-gray-200">
        <ul className="flex justify-between w-full max-w-4xl mx-auto">
          <li className="w-20 text-xs">
            <Link
              href={{
                pathname: "/userList",
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <HomeIcon color={currentPage === "/userList" ? "#2563EB" : "black"} />
                <div className={`${currentPage === "/userList" ? "text-blue-500" : "test-black"} mt-1`}>홈</div>
              </div>
            </Link>
          </li>
          <li className="w-20 text-xs">
            <Link
              href={{
                pathname: "/my/friendList",
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <UserIcon color={currentPage === "/my/friendList" ? "#2563EB" : "black"} />
                <div className={`${currentPage === "/my/friendList" ? "text-blue-500" : "test-black"} mt-1`}>
                  친구 관리
                </div>
              </div>
            </Link>
          </li>
          <li className="w-20 text-xs">
            <Link
              href={{
                pathname: "/my/chatList",
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <MessageIcon color={currentPage === "/my/chatList" ? "#2563EB" : "black"} />
                <div className={`${currentPage === "/my/chatList" ? "text-blue-500" : "test-black"} mt-1`}>
                  채팅 목록
                </div>
              </div>
            </Link>
          </li>
          <li className="w-20 text-xs">
            <Link
              href={{
                pathname: "/setting/profile",
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <SettingIcon color={currentPage === "/setting/profile" ? "#2563EB" : "black"} />
                <div className={`${currentPage === "/setting/profile" ? "text-blue-500" : "test-black"} mt-1`}>
                  내 프로필 수정
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
}

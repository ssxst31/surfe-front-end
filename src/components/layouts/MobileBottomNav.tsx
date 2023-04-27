import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MobileBottomNav() {
  const router = useRouter();
  const currentPage = router.pathname;
  const notPublicPages = ["/", "privateChat", "everyChat"];
  const pageRootName = currentPage !== "/" ? currentPage.slice(1).split("/")[0] : "/";

  const activeNavPage = !notPublicPages.includes(pageRootName);

  return activeNavPage ? (
    <div className="fixed w-full bg-white z-[2] -lg:px-5 shadow-xl text-center py-3 bottom-0 lg:hidden  border-t border-solid border-gray-200">
      <ul className="flex justify-between w-full max-w-4xl mx-auto">
        <li className="w-20 text-xs">
          <Link
            href={{
              pathname: "/",
            }}
          >
            홈
          </Link>
        </li>
        <li className="w-20 text-xs">
          <Link
            href={{
              pathname: "/my/friendList",
            }}
          >
            친구관리
          </Link>
        </li>
        <li className="w-20 text-xs">
          <Link
            href={{
              pathname: "/my/chatList",
            }}
          >
            채팅목록
          </Link>
        </li>
        <li className="w-20 text-xs">
          <Link
            href={{
              pathname: "/setting/profile",
            }}
          >
            내 프로필 수정
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <></>
  );
}

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Footer() {
  const router = useRouter();
  const currentPage = router.pathname;
  const noShowPages = ["/"];
  const pageRootName = currentPage.slice(1).split("/")[0] || "/";
  const isNoShow = noShowPages.includes(pageRootName);

  if (isNoShow) {
    return <></>;
  }

  return (
    <footer className="w-full py-8 text-center bg-gray-50 flex-column">
      <div className="mx-auto max-w-7xl px-[30px] -md:px-4 -md:mx-0">
        <div className="flex justify-between text-black ">
          <small>ⓒ 서피 2023 All Rights Reserved.</small>
          <div className="flex flex-col text-sm text-black ">
            <Link href="https://icons8.com" target="_blank" rel="noopener noreferrer">
              <span className="text-right">icons8에서 아이콘 제공</span>
            </Link>
          </div>
        </div>
        <div className="flex pt-12 space-x-2">
          <div>
            <button
              onClick={() => {
                alert("준비 중입니다.");
              }}
              className="text-sm"
            >
              이용약관
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                alert("준비 중입니다.");
              }}
              className="text-sm"
            >
              개인정보처리방침
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

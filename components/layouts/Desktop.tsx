import React, { useState } from "react";
import Link from "next/link";

import { logOut } from "pages/api/auth";
import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";
import useMe from "hooks/useMe";

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
    <div>
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
            <img src="/title.png" width={96} height={96} />
            {me ? (
              <div className="text-black">
                <div className="flex items-center my-4">
                  <img
                    src={
                      me.profile
                        ? "https://api.surfe.store/uploads/" + me.profile
                        : "https://i.pinimg.com/236x/70/be/b2/70beb2f42ae1c4cfe7a32ec61a93c2f5.jpg"
                    }
                    className="rounded-[50%] h-12 w-12 mr-2"
                    alt="profile"
                  />
                  <div>
                    <div className="text-sm">{me.nickname}</div>
                    <div className="text-xs">{me.email}</div>
                    <div className="text-xs">{me.introduce}</div>
                    <div className="text-xs">{me.mbti}</div>
                  </div>
                </div>
                <div className="flex flex-col mt-2 space-y-2">
                  <button
                    onClick={() => {
                      alert("준비 중입니다.");
                    }}
                    className="w-32 py-1 text-base text-white bg-blue-400 rounded-lg"
                  >
                    내 프로필 수정
                  </button>
                  <button
                    onClick={() => {
                      alert("준비 중입니다.");
                    }}
                    className="w-32 py-1 text-base text-white bg-blue-400 rounded-lg"
                  >
                    설정
                  </button>
                  <button onClick={signOut} className="w-32 py-1 text-base text-white bg-blue-400 rounded-lg">
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link href="/" className="w-36">
                  <button
                    className="w-full py-2 text-white bg-blue-400 rounded-lg"
                    onClick={() => {
                      setIsSidebar(false);
                    }}
                  >
                    로그인
                  </button>
                </Link>
                <Link href="/signup" className="w-36">
                  <button
                    className="w-full py-2 text-white bg-blue-400 rounded-lg"
                    onClick={() => {
                      setIsSidebar(false);
                    }}
                  >
                    회원가입
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <Header setIsSidebar={setIsSidebar} me={me} />
      <div className="w-full h-14" />
      <div className="max-w-4xl mx-auto">{children}</div>
      <Footer />
    </div>
  );
}

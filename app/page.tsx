"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

import { meState } from "app/store";

export default function Home() {
  // // const dsa = use(fetchProfile());
  // console.log(dsa);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [me, setMe] = useRecoilState<string>(meState);

  const goWs = () => {
    let inputValue = inputRef.current?.value;

    if (typeof inputValue === "undefined" || inputValue === "") {
      return alert("입력해주세요.");
    }

    setMe(inputValue);

    router.push("/ws");
  };

  const goSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col items-center">
      <input
        placeholder="닉네임"
        className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
        ref={inputRef}
        name="title"
      />
      <button onClick={goWs}>로그인</button>
      <button onClick={goSignup}>회원가입</button>
    </div>
  );
}

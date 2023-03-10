"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const goWs = () => {
    router.push("/ws");
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
    </div>
  );
}

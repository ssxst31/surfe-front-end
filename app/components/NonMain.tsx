"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function NonMain() {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const goWs = () => {
    let inputValue = inputRef.current?.value;

    if (typeof inputValue === "undefined" || inputValue === "") {
      return alert("입력해주세요.");
    }

    router.push("/ws");
  };

  const goSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col">
      <button onClick={goWs}>로그인</button>
      <button onClick={goSignup}>회원가입</button>
    </div>
  );
}

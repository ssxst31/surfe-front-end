"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { login } from "app/api/user";

export default function NonMain() {
  const router = useRouter();

  const [inputs, setInputs] = useState<any>({
    email: "",
    password: "",
  });

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

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const { email, password } = inputs;

  const submit = async () => {
    const res = await login({ email, password }).catch((err) => {
      alert(err.response.data.message);
    });

    if (res) {
      return location.reload();
    }
  };

  return (
    <div className="flex flex-col">
      <input
        placeholder="이메일"
        className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
        value={email}
        name="email"
        onChange={onChange}
      />
      <div className="w-full h-4" />
      <input
        placeholder="비밀번호"
        className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
        value={password}
        name="password"
        onChange={onChange}
      />
      <button onClick={submit}>로그인</button>
      <button onClick={goSignup}>회원가입</button>
    </div>
  );
}

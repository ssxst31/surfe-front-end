"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createUser } from "app/api/user";

export default function Signup() {
  const router = useRouter();

  const [inputs, setInputs] = useState<any>({
    email: "",
    password: "",
    checkPassword: "",
    nickname: "",
  });

  const { email, password, checkPassword, nickname } = inputs;

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submit = async () => {
    const res = await createUser(inputs).catch((err) => {
      alert(err.response.data.message);
    });

    if (res) {
      if (confirm(res.message)) {
        router.push("/");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-16" />
      <div className="h-20 bg-red-600 w-44">채팅웹</div>
      <div className="w-full h-10" />
      <div className="flex flex-col items-center w-full space-y-4">
        <input
          placeholder="이메일"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
          value={email}
          name="email"
          onChange={onChange}
          type="email"
        />
        <input
          placeholder="비밀번호"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
          value={password}
          name="password"
          onChange={onChange}
          type="password"
        />
        <input
          placeholder="비밀번호 재확인"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
          value={checkPassword}
          name="checkPassword"
          onChange={onChange}
          type="password"
        />
        <input
          placeholder="닉네임"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
          value={nickname}
          name="nickname"
          onChange={onChange}
          type="text"
        />
        <button className="py-4 text-white bg-red-500 w-96" onClick={submit}>
          가입하기
        </button>
      </div>
    </div>
  );
}

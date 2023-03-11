"use client";

import { useState } from "react";
import { useRecoilState } from "recoil";
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

  const { email, password, checkPassword, nickname } = inputs;

  return (
    <div className="flex flex-col items-center">
      <input
        placeholder="이메일"
        className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
        value={email}
        name="email"
        onChange={onChange}
      />
      <input
        placeholder="비밀번호"
        className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
        value={password}
        name="password"
        onChange={onChange}
      />
      <input
        placeholder="비밀번호 재확인"
        className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
        value={checkPassword}
        name="checkPassword"
        onChange={onChange}
      />
      <input
        placeholder="닉네임"
        className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
        value={nickname}
        name="nickname"
        onChange={onChange}
      />
      <button onClick={submit}>가입하기</button>
    </div>
  );
}

import { useState } from "react";
import Link from "next/link";

import { login } from "pages/api/auth";

export default function Main() {
  const [inputs, setInputs] = useState<any>({
    email: "",
    password: "",
  });

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
      window.location.href = "/userList";
    }
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center mt-24 text-center">
      <img src="logo.png" width={96} height={96} className="mx-auto mb-2" />
      <div className="text-5xl">surfe</div>
      <div className="mb-5 text-sm">주위의 다양한 사람들과 채팅해보세요</div>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <input
          placeholder="이메일"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-64 -sm:mx-auto"
          value={email}
          name="email"
          onChange={onChange}
          type="email"
        />
        <div className="w-full h-4" />
        <input
          placeholder="비밀번호"
          type="password"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-64 -sm:mx-auto"
          value={password}
          name="password"
          onChange={onChange}
        />
        <button
          onClick={submit}
          className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 mt-10 -sm:w-64 -sm:mx-auto"
        >
          로그인
        </button>
      </form>
      <Link href="/signup" className="-sm:w-64 -sm:mx-auto w-96">
        <button className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 w-full">
          회원가입
        </button>
      </Link>
    </div>
  );
}

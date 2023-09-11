import { useState } from "react";
import Link from "next/link";

import { login } from "pages/api/auth";
import Logo from "components/common/Logo";

export default function Main() {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const { id, password } = inputs;

  const submit = async () => {
    const res = await login({ id, password }).catch((err) => {
      alert(err.response.data.message);
    });

    if (res) {
      window.location.href = "/explore";
    }
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center mx-3 text-center mt-14">
      <h1>
        <div className="relative h-20 w-52">
          <Logo className="text-black text-[50px]" />
        </div>
        <div className="mb-5 text-sm text-center">주위의 다양한 사람들과 채팅해보세요</div>
      </h1>
      <form className="flex flex-col -lg:w-full" onSubmit={onSubmit}>
        <input
          placeholder="아이디"
          className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -lg:w-full"
          value={id}
          name="id"
          onChange={onChange}
          type="id"
        />
        <div className="w-full h-4" />
        <input
          placeholder="비밀번호"
          type="password"
          className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -lg:w-full"
          value={password}
          name="password"
          onChange={onChange}
        />
        <button
          onClick={submit}
          className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 mt-10 -lg:w-full"
        >
          로그인
        </button>
      </form>

      <div className="font-medium rounded-lg text-sm px-5 py-2.5 w-full text-black">
        아직 회원이 아니신가요?
        <Link href="/signup" className="w-96 -lg:w-full ml-2 text-blue-500">
          회원가입 하기
        </Link>
      </div>
    </div>
  );
}

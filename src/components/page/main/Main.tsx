import { useState } from "react";
import Link from "next/link";

import { kakaoInit } from "utils/kakao";
import { login } from "pages/api/auth";
import Logo from "components/common/Logo";
import { isIdValid, isPasswordValid } from "components/page/signup/utils/inputValid";
import KakaoLogoIcon from "assets/icons/kakaoLogo.svg";

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
    if (!isIdValid(id)) return alert("아이디 형식을 확인해주세요");
    if (!isPasswordValid(password)) return alert("비밀번호 형식을 확인해주세요");

    const res = await login({ id, password }).catch((err) => {
      alert(err.response.data.message);
    });

    if (res) {
      window.location.href = "/explore";
    }
  };

  const handleSignWithKaKao = () => {
    const kakao = kakaoInit();
    console.log(process.env.NEXT_PUBLIC_APP_HOST_NAME);
    kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_APP_HOST_NAME}/callback/kakao/authorize`,
    });
  };

  return (
    <div className="h-screen bg-gradient-to-t from-blue-500 to-indigo-500">
      <div className="flex flex-col items-center mx-3 text-center pt-32">
        <div className="flex flex-col">
          <h1>
            <div className="relative h-20 w-52">
              <Logo className="text-white text-[50px]" />
            </div>
            <div className="mb-5 text-sm text-center text-white">근처의 다양한 사람들과 채팅해보세요</div>
          </h1>
        </div>
        <form
          className="flex flex-col -sm:w-full text-left mt-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="-sm:w-full relative group">
            <input
              name="id"
              onChange={onChange}
              type="text"
              required
              className="w-full h-10 px-4 text-sm peer outline-none bg-transparent border-0 border-b border-white"
              value={id}
            />
            <label
              htmlFor="username"
              className="text-white transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
            >
              아이디
            </label>
          </div>
          <div className="w-full h-10" />
          <div className="-sm:w-full relative group">
            <input
              type="password"
              value={password}
              name="password"
              onChange={onChange}
              required
              className="w-full h-10 px-4 text-sm peer outline-none bg-transparent border-0  border-b border-white"
            />
            <label
              htmlFor="username"
              className="text-white transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
            >
              비밀번호
            </label>
          </div>
          <button
            onClick={submit}
            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-4 mt-10 w-96 -sm:w-full border-white border border-solid"
          >
            로그인
          </button>
          <button
            onClick={handleSignWithKaKao}
            className="cursor-pointer w-full rounded-lg bg-[#FEE500] text-black inline-flex items-center relative justify-center px-5 py-2.5"
          >
            <div className="absolute left-3 top-3">
              <KakaoLogoIcon />
            </div>
            카카오 로그인
          </button>
        </form>

        <div className="font-medium rounded-lg text-sm px-5 py-2.5 w-full text-black">
          아직 회원이 아니신가요?
          <Link href="/signup" className="w-96 -lg:w-full ml-2 text-white">
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
}

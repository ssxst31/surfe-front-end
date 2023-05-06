import React, { useState } from "react";
import Image from "next/image";

import { INTERESTS, MBTIS } from "consts";
import { createUser } from "pages/api/auth";
import Images from "assets/images";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    checkPassword: "",
    nickname: "",
  });
  const [interestList, setInterestList] = useState<string[]>([]);
  const [mbti, setMbti] = useState("");
  const [introduce, setIntroduce] = useState("");

  const { email, password, checkPassword, nickname } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();

    const res = await createUser(inputs, interestList, mbti, introduce).catch((err) => {
      alert(err.response.data.message);
    });

    if (res) {
      if (process.env.NEXT_PUBLIC_ENV === "development") {
        window.location.assign(`http://localhost:3000/completed/signup`);
      } else {
        window.location.assign(`https://www.surfe.store/completed/signup`);
      }
    }
  };

  const interestHandler = (interest: string) => {
    if (interestList.length >= 3 && !interestList.includes(interest)) return alert("최대 3개 까지만 선택가능합니다.");

    if (interestList.includes(interest)) {
      const interestListFiltered = interestList.filter((el) => el !== interest);
      setInterestList(interestListFiltered);
    } else {
      const newInterestList = interestList.concat(interest);
      setInterestList(newInterestList);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMbti(e.target.value);
  };

  return (
    <div className="flex flex-col items-center mx-3 text-center mt-14">
      <div className="flex flex-col">
        <h1>
          <div className="relative h-20 w-52">
            <Image src={Images.BlueTitle} fill alt="d2" />
          </div>
          <div className="mb-5 text-sm text-center">주위의 다양한 사람들과 채팅해보세요</div>
        </h1>
      </div>
      <form className="flex flex-col space-y-4 -sm:w-full" onSubmit={submit}>
        <div className="-sm:w-full">
          <h2 className="text-left">
            <label htmlFor="email" className="font-bold">
              이메일
            </label>
          </h2>
          <input
            placeholder="이메일"
            className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
            value={email}
            name="email"
            onChange={onChange}
            type="email"
            id="email"
          />
        </div>
        <div className="w-96 -sm:w-full">
          <h2 className="text-left">
            <label htmlFor="password" className="font-bold">
              비밀번호
            </label>
          </h2>
          <input
            placeholder="비밀번호"
            className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
            value={password}
            name="password"
            onChange={onChange}
            type="password"
            id="password"
          />
        </div>
        <div className="w-96 -sm:w-full">
          <h2 className="text-left">
            <label htmlFor="checkPassword" className="font-bold">
              비밀번호 재확인
            </label>
          </h2>
          <input
            placeholder="비밀번호 재확인"
            className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
            value={checkPassword}
            name="checkPassword"
            onChange={onChange}
            type="password"
            id="checkPassword"
          />
        </div>
        <div className="w-96 -sm:w-full">
          <h2 className="text-left">
            <label htmlFor="nickname" className="font-bold">
              닉네임
            </label>
          </h2>
          <input
            placeholder="닉네임"
            className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
            value={nickname}
            name="nickname"
            onChange={onChange}
            type="text"
            id="nickname"
          />
        </div>
        <div className="w-96 -sm:w-full">
          <h2 className="text-left">
            <label className="font-bold">관심사(3개선택)</label>
          </h2>
          <div className="flex flex-wrap -sm:w-full">
            {INTERESTS.map((interest) => (
              <div
                key={interest.id}
                className={`h-10 px-4 py-2 mt-2 mr-2 rounded-lg cursor-pointer  ${
                  interestList.includes(interest.content) ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-500"
                }`}
                onClick={() => {
                  interestHandler(interest.content);
                }}
              >
                {interest.content}
              </div>
            ))}
          </div>
        </div>
        <div className="w-96 -sm:w-full">
          <h2 className="text-left">
            <label className="font-bold">MBTI</label>
          </h2>
          <div className="flex flex-wrap -sm:w-full">
            <select
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500"
              name="MBTI"
              onChange={handleChange}
              value={mbti}
            >
              {MBTIS.map((el) => (
                <option value={el.content} key={el.id}>
                  {el.content}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-96 -sm:w-full">
          <h2 className="text-left">
            <label htmlFor="introduce" className="font-bold">
              한줄소개
            </label>
          </h2>
          <input
            placeholder="5글자이상 입력해주세요"
            className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
            value={introduce}
            name="introduce"
            onChange={(e) => {
              setIntroduce(e.target.value);
            }}
            type="text"
            id="introduce"
          />
        </div>
        <button
          onClick={submit}
          className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 w-96 -sm:w-full -sm:mx-auto"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}

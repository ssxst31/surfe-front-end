import React, { useState, Fragment } from "react";

import { INTERESTS, MBTIS } from "consts";
import { createUser } from "pages/api/auth";
import Logo from "components/Logo";
import { Listbox, Transition } from "@headlessui/react";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
    checkPassword: "",
    nickname: "",
  });
  const [interestList, setInterestList] = useState<string[]>([]);
  const [mbti, setMbti] = useState(MBTIS[0].content);
  const [statusMessage, setStatusMessage] = useState("");

  const { id, password, checkPassword, nickname } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();

    const res = await createUser(inputs, interestList, mbti, statusMessage).catch((err) => {
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

  return (
    <div className="flex flex-col items-center mx-3 text-center mt-14">
      <div className="flex flex-col">
        <h1>
          <div className="relative h-20 w-52">
            <Logo className="text-black text-[50px]" />
          </div>
          <div className="mb-5 text-sm text-center">주위의 다양한 사람들과 채팅해보세요</div>
        </h1>
      </div>
      <form className="flex flex-col space-y-4 -sm:w-full" onSubmit={submit}>
        <div className="-sm:w-full">
          <h2 className="text-left">
            <label htmlFor="id" className="font-bold">
              아이디
            </label>
          </h2>
          <input
            placeholder="아이디"
            className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
            value={id}
            name="id"
            onChange={onChange}
            type="id"
            id="id"
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
                className={`h-10 px-4 py-2 mt-2 mr-2 rounded-lg cursor-pointer  border border-blue-500 ${
                  interestList.includes(interest.content) ? "bg-blue-500 text-white" : " text-black"
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
          <Listbox value={mbti} onChange={setMbti}>
            <div className="relative">
              <Listbox.Button className="relative w-full px-5 py-3 rounded-md border border-gray-300 bg-white text-left">
                <span className="block truncate">{mbti}</span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto w-full rounded-md bg-white py-1 text-base shadow-lg">
                  {MBTIS.map((mbti) => (
                    <Listbox.Option
                      key={mbti.id}
                      value={mbti.content}
                      className={({ active }) =>
                        `relative select-none py-2 pl-10 pr-4 cursor-pointer ${
                          active ? "bg-blue-100" : "text-gray-900"
                        }`
                      }
                    >
                      {mbti.content}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="w-96 -sm:w-full">
          <h2 className="text-left">
            <label htmlFor="statusMessage" className="font-bold">
              상태 메시지
            </label>
          </h2>
          <input
            placeholder="5글자이상 입력해주세요"
            className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
            value={statusMessage}
            name="statusMessage"
            onChange={(e) => {
              setStatusMessage(e.target.value);
            }}
            type="text"
            id="statusMessage"
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

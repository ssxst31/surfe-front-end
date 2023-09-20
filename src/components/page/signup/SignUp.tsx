import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { INTERESTS, MBTIS } from "consts";
import { createUser } from "pages/api/auth";
import Logo from "components/common/Logo";

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
  const isActiveSignUp = id && password && checkPassword && nickname && mbti && statusMessage;

  return (
    <div className=" h-screen bg-gradient-to-t from-blue-500 to-indigo-500 -sm:h-full">
      <div className="flex flex-col items-center mx-3 text-center">
        <div className="flex flex-col">
          <h1>
            <div className="relative h-20 w-52">
              <Logo className="text-white text-[50px]" />
            </div>
            <div className="mb-5 text-sm text-center text-white">근처의 다양한 사람들과 채팅해보세요</div>
          </h1>
        </div>
        <form className="flex flex-col space-y-10 -sm:w-full text-left mt-2" onSubmit={submit}>
          <div className="-sm:w-full relative group">
            <input
              name="id"
              onChange={onChange}
              type="text"
              required
              className="w-full h-10 px-4 text-sm peer outline-none bg-transparent border-0 border-b border-white"
              value={id}
              id="id"
            />
            <label
              htmlFor="username"
              className="text-white transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
            >
              아이디
            </label>
            {id && (
              <ul className="text-xs mt-1">
                <li>· 최소 5자, 최대 12자까지 가능해요</li>
                <li>· 영문 대소문자와 숫자만 가능합니다.</li>
              </ul>
            )}
          </div>
          <div className="-sm:w-full relative group">
            <input
              name="password"
              onChange={onChange}
              type="password"
              required
              className="w-full h-10 px-4 text-sm peer outline-none bg-transparent border-0 border-b border-white"
              value={password}
              id="password"
            />
            <label
              htmlFor="username"
              className="text-white transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
            >
              비밀번호
            </label>
            {password && (
              <ul className="text-xs mt-1">
                <li>· 최소 8자, 최대 16자까지 가능해요</li>
                <li>· 영문 대소문자,숫자, 특수문자를 사용해주세요</li>
              </ul>
            )}
          </div>
          <div className="-sm:w-full relative group">
            <input
              name="checkPassword"
              onChange={onChange}
              type="password"
              required
              className="w-full h-10 px-4 text-sm peer outline-none bg-transparent border-0 border-b border-white"
              value={checkPassword}
              id="checkPassword"
            />
            <label
              htmlFor="username"
              className="text-white transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
            >
              비밀번호 재확인
            </label>
          </div>
          <div className="-sm:w-full relative group">
            <input
              name="nickname"
              onChange={onChange}
              type="nickname"
              required
              className="w-full h-10 px-4 text-sm peer outline-none bg-transparent border-0 border-b border-white"
              value={nickname}
              id="nickname"
            />
            <label
              htmlFor="username"
              className="text-white transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
            >
              닉네임
            </label>
            {nickname && (
              <ul className="text-xs mt-1">
                <li>· 최소 2자, 최대 12자까지 가능해요</li>
                <li>· 특수문자는 불가능해요</li>
              </ul>
            )}
          </div>
          <div className="w-96 -sm:w-full">
            <h2 className="text-left">
              <label className="text-white text-sm">관심사(3개선택)</label>
            </h2>
            <div className="flex flex-wrap -sm:w-full">
              {INTERESTS.map((interest) => (
                <div
                  key={interest.id}
                  className={`h-10 px-4 py-2 mt-2 mr-2 rounded-lg cursor-pointer  border border-white ${
                    interestList.includes(interest.content) ? " text-green-400 border-green-400" : " text-black"
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
              <label className="text-white text-sm">MBTI</label>
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
                  <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto w-full rounded-md bg-white py-1 text-base shadow-lg z-10">
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
          <div className="-sm:w-full relative group">
            <input
              name="statusMessage"
              onChange={(e) => {
                setStatusMessage(e.target.value);
              }}
              type="text"
              required
              className="w-full h-10 px-4 text-sm peer outline-none bg-transparent border-0 border-b border-white"
              value={statusMessage}
              id="statusMessage"
            />
            <label
              htmlFor="username"
              className="text-white transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
            >
              상태 메시지
            </label>
            {statusMessage && (
              <ul className="text-xs mt-1">
                <li>· 최대 20글자까지 가능해요</li>
              </ul>
            )}
          </div>
          <button
            onClick={submit}
            className={`${
              !isActiveSignUp && "opacity-40"
            } text-white border-white border border-solid font-medium rounded-lg text-sm px-5 py-2.5 w-96 -sm:w-full -sm:mx-auto`}
            disabled={!isActiveSignUp}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { INTERESTS, MBTIS } from "components/page/signup/consts";

import Logo from "components/common/Logo";

interface SignUpSecondProps {
  interestHandler: (interest: string) => void;
  action: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputs: {
    nickname: string;
  };
  mbti: string;
  statusMessage: string;
  interestList: string[];
  setMbti: React.Dispatch<React.SetStateAction<string>>;
  setStatusMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpSecond({
  interestHandler,
  action,
  onChange,
  inputs,
  mbti,
  statusMessage,
  interestList,
  setMbti,
  setStatusMessage,
}: SignUpSecondProps) {
  const { nickname } = inputs;

  const isActiveSignUp = nickname && mbti && interestList.length === 3;

  return (
    <div className=" h-screen bg-gradient-to-t from-blue-500 to-indigo-500">
      <div className="flex flex-col items-center mx-3 text-center">
        <div className="flex flex-col">
          <h1>
            <div className="relative h-20 w-52">
              <Logo className="text-white text-[50px]" />
            </div>
            <div className="mb-5 text-sm text-center text-white">근처의 다양한 사람들과 채팅해보세요</div>
          </h1>
        </div>
        <form
          className="flex flex-col space-y-10 -sm:w-full text-left mt-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
              <label className="text-white text-xs">MBTI</label>
            </h2>
            <Listbox value={mbti} onChange={setMbti}>
              <div className="relative">
                <Listbox.Button className="relative w-full px-5 py-2.5 rounded-md border-b border-0 bg-transparent text-left text-black text-sm">
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
          <div className="w-96 -sm:w-full">
            <h2 className="text-left">
              <label className="text-white text-xs">관심사(3개선택)</label>
            </h2>
            <div className="flex flex-wrap -sm:w-full">
              {INTERESTS.map((interest) => (
                <div
                  key={interest.id}
                  className={`px-4 py-1 mt-2 mr-2 text-sm rounded-lg cursor-pointer border ${
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
            onClick={action}
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

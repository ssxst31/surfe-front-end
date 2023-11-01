import React, { useState, useRef, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

import useMe from "hooks/useMe";
import { postThumbnail, updateProfile } from "pages/api/my";
import PencilIcon from "assets/icons/pencil.svg";
import Avatar from "components/common/Avatar";
import type { NextPage } from "next";
import DefaultLayout from "components/layouts/DefaultLayout";
import { MBTIS } from "components/page/signup/consts";
import { logOut } from "pages/api/auth";

const ProfilePage: NextPage = () => {
  const { me } = useMe();
  const [mbti, setMbti] = useState(me.mbti);
  const [statusMessage, setStatusMessage] = useState(me.statusMessage);
  const [nickname, setNickname] = useState(me.nickname);
  const [imgFile, setImgFile] = useState<any>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    const formData = new FormData();
    formData.append("image", file);

    const response = await postThumbnail(formData);
    alert(response);
  };

  const onUploadImageButtonClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const signOut = async () => {
    await logOut();

    window.location.href = "/";
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center mx-3 text-center mt-14">
        <form
          className="flex flex-col space-y-4 -sm:w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="-sm:w-full">
            <h2 className="text-left">
              <label htmlFor="introduce" className="font-bold">
                프로필 사진
              </label>
            </h2>
            <input
              type="file"
              accept="image/*"
              name="thumbnail"
              ref={inputRef}
              onChange={onUploadImage}
              className="hidden"
            />
            <div className="flex justify-center" onClick={onUploadImageButtonClick}>
              <Avatar width="w-24" height="h-24" image={me.profileImage}>
                <PencilIcon color="black" className="w-6 h-6 absolute right-4 bottom-3" />
              </Avatar>
            </div>
          </div>
          <div className="-sm:w-full">
            <h2 className="text-left">
              <label htmlFor="id" className="font-bold">
                아이디
              </label>
            </h2>
            <input
              placeholder="아이디"
              className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
              name="id"
              type="id"
              id="id"
              value={me.loginId}
              readOnly
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
              name="nickname"
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="w-96 -sm:w-full">
            <h2 className="text-left">
              <label htmlFor="statusMessage" className="font-bold">
                한줄소개
              </label>
            </h2>
            <input
              placeholder="5글자 이상 입력해주세요"
              className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
              name="statusMessage"
              type="text"
              id="statusMessage"
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
            />
          </div>
          <div className="w-96 -sm:w-full">
            <h2 className="text-left">
              <label htmlFor="mbti" className="font-bold">
                MBTI
              </label>
            </h2>
            <Listbox value={mbti} onChange={setMbti}>
              <div className="relative">
                <Listbox.Button className="relative w-full px-5 py-2.5 rounded-md border border-gray-300 bg-transparent text-left text-black text-sm">
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
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 w-96 -sm:w-full -sm:mx-auto"
            onClick={async () => {
              const response = await updateProfile({ statusMessage, nickname, mbti });
              if (response === "OK") {
                alert("수정 되었습니다.");
              }
            }}
          >
            저장하기
          </button>
        </form>
        <button
          className=" text-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-96 -sm:w-full -sm:mx-auto mt-3"
          onClick={signOut}
        >
          로그아웃
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;

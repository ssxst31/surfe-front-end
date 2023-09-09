import React, { useState, useRef } from "react";

import useMe from "hooks/useMe";
import { postThumbnail } from "pages/api/my";
import PencilIcon from "assets/icons/pencil.svg";
import Avatar from "components/common/Avatar";
import type { NextPage } from "next";

const ProfilePage: NextPage = () => {
  const me = useMe();

  const [imgFile, setImgFile] = useState<any>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    const formData = new FormData();
    formData.append("image", file);

    const dsa = await postThumbnail(formData);

    alert(dsa);
  };

  const onUploadImageButtonClick = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  return (
    <>
      <div className="flex flex-col items-center mx-3 text-center mt-14">
        <form className="flex flex-col space-y-4 -sm:w-full">
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
              <Avatar width="w-24" height="h-24">
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
              value={me.nickname}
            />
          </div>
          <div className="w-96 -sm:w-full">
            <h2 className="text-left">
              <label htmlFor="statusMessage" className="font-bold">
                한줄소개
              </label>
            </h2>
            <input
              placeholder="5글자이상 입력해주세요"
              className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
              name="statusMessage"
              type="text"
              id="statusMessage"
              value={me.statusMessage}
            />
          </div>
          <div className="w-96 -sm:w-full">
            <h2 className="text-left">
              <label htmlFor="mbti" className="font-bold">
                MBTI
              </label>
            </h2>
            <input
              placeholder="5글자이상 입력해주세요"
              className="px-5 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96 -sm:w-full"
              name="mbti"
              type="text"
              id="mbti"
              value={me.mbti}
            />
          </div>
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 w-96 -sm:w-full -sm:mx-auto"
            onClick={() => {
              alert("준비중입니다.");
            }}
          >
            저장하기
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;

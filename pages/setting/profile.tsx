import React, { useState, useRef } from "react";

import useMe from "hooks/useMe";
import { postThumbnail } from "pages/api/my";
import { createProfile } from "utils/profile";
import type { NextPage } from "next";

const UserPage: NextPage = () => {
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
    <div>
      <div className="w-96 -sm:w-full">
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
        <div className="relative cursor-pointer" onClick={onUploadImageButtonClick}>
          <img
            src={
              imgFile
                ? imgFile ?? "https://i.pinimg.com/236x/70/be/b2/70beb2f42ae1c4cfe7a32ec61a93c2f5.jpg"
                : `${createProfile()}` + me.profile
            }
            alt="프로필 이미지"
            className="w-24 h-24 rounded-[50%] mx-auto"
          />
          <img src="/edit.png" alt="편집" className="absolute bottom-2 w-6 h-6 right-[40%]" />
        </div>
      </div>
      <div>{me.nickname}</div>
      <div>{me.mbti}</div>
      <div>{me.introduce}</div>
      <div>저장</div>
    </div>
  );
};

export default UserPage;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import type { NextPage } from "next";
import { Profile } from "type";
import { fetchUserProfile } from "pages/api/users";
import StarIcon from "assets/icons/star.svg";

const UserPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const [profile, setProfile] = useState<Profile>();

  const loadUserProfile = async () => {
    const res = await fetchUserProfile(id);

    return setProfile(res);
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  if (!profile) {
    return <></>;
  }

  return (
    <div>
      <div className="flex -lg:flex-col ">
        <img src={profile.profileImage} className="mr-2 shadow-2xl w-96 h-96 -lg:w-full" alt="profile" />
        <div className="flex flex-col p-3">
          <div className="text-3xl">{profile.nickname}</div>
          <div className="text-2xl">{profile.mbti}</div>
          <div className="flex mt-2 space-x-2 w-full">
            {profile.interestList.map((el: any) => (
              <div
                className="px-2 py-1 text-black border border-blue-500 border-solid rounded-xl w-24 flex items-center justify-center"
                key={el}
              >
                <StarIcon color="#3b82f6" className="w-4 h-4 border border-blue-500 border-solid rounded-[50%] mr-1" />
                <span>{el}</span>
              </div>
            ))}
          </div>
          <div className="mt-2">{profile.statusMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

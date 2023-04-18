import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import type { NextPage } from "next";
import { fetchUserProfile } from "pages/api/user";
import { createProfile } from "utils/profile";

const UserPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const [profile, setProfile] = useState<any>();

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
        <img
          src={
            profile.profile
              ? `${createProfile()}` + profile.profile
              : "https://i.pinimg.com/236x/70/be/b2/70beb2f42ae1c4cfe7a32ec61a93c2f5.jpg"
          }
          className="mr-2 shadow-2xl w-96 h-96 -lg:w-full"
          alt="profile"
        />
        <div className="flex flex-col p-3">
          <div className="text-3xl">{profile.nickname}</div>
          <div className="text-2xl">{profile.mbti}</div>
          <div className="flex mt-2 space-x-2">
            {profile.interestList.map((el: any) => (
              <div className="px-2 py-1 text-white bg-red-200 rounded-lg">{el}</div>
            ))}
          </div>
          <div className="mt-2">{profile.introduce}</div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

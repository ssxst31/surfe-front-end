import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";

import type { NextPage } from "next";

const FriendListPage: NextPage = () => {
  const friendList = [
    {
      id: 1,
      nickname: "아이유",
      profile: "https://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg",
      introduction: "안녕하세요~~",
      mbti: "ISTJ",
    },
    {
      id: 2,
      nickname: "안녕나야",
      profile: "https://s3.orbi.kr/data/file/united2/7559d4b48ce54f7dba55d2006a53851d.png",
      introduction: "고앵이다!!",
      mbti: "INFJ",
    },
    {
      id: 3,
      nickname: "조아",
      profile: "https://i.pinimg.com/550x/c3/aa/21/c3aa2113a7a8cdf3263314d3c6022ee7.jpg",
      introduction: "안녕하세요~~호방나기",
      mbti: "ESTP",
    },
  ];

  const friendRequestList = [
    {
      id: 1,
      nickname: "헌22",
      profile: "https://image.chosun.com/sitedata/image/202205/03/2022050300459_0.jpg",
      introduction: "운동뿌셔!!!!",
      mbti: "INFJ",
    },
    {
      id: 2,
      nickname: "누구야야야",
      profile: "https://blog.kakaocdn.net/dn/IOYEi/btq1JzPmm2w/Jn7TB4RqutJNkyeAS8K0U1/img.jpg",
      introduction: "축구할사람",
      mbti: "ENFJ",
    },
    {
      id: 3,
      nickname: "아이어이",
      profile:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTAxMDVfMiAg/MDAxNTQ2NjM3NjQ1NjAw.rR3iT6M4n5XDy73_ackKUuXfF74LjYxkCc8p4Tq0l5Ug.47yDlzTdE89jjkOYydjy3nTwoJQuKG42ie9bq3ae23wg.JPEG.yakmir2/%EC%97%B0%EC%98%88%EC%9D%B8_%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4_%2811%29.jpg?type=w2",
      introduction: "오 서피뭐야",
      mbti: "ENFP",
    },
  ];

  return (
    <div>
      <div className="w-full">
        <Tab.Group>
          <Tab.List className="flex justify-between w-full">
            <Tab
              className={({ selected }) =>
                selected
                  ? " text-black w-1/2 border-blue-400 border-b-2 border-solid py-2"
                  : " text-gray-400 w-1/2 py-2 border-gray-200 border-b-2 border-solid"
              }
            >
              내 친구
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? " text-black w-1/2 border-blue-400 border-b-2 border-solid py-2"
                  : " text-gray-400 w-1/2 py-2 border-gray-200 border-b-2 border-solid"
              }
            >
              친구 요청
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="outline-none ring-white ring-opacity-60 ">
              <div className="flex">
                친구 <div className="font-bold text-blue-400">{friendList.length}</div>명
              </div>
              <ul>
                {friendList.map((friend) => (
                  <li key={friend.id} className="relative flex justify-between p-3 rounded-md hover:bg-gray-100">
                    <div className="flex">
                      <img src={friend.profile} className="rounded-[50%] h-14 w-14 mr-4" alt="profile" />
                      <div>
                        <div>
                          <span>{friend.nickname}</span>
                          <span className="text-gray-400"> {`(${friend.mbti})`}</span>
                        </div>
                        <div>{friend.introduction}</div>
                      </div>
                    </div>
                    <button
                      className="w-20 px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      onClick={() => {
                        alert("준비중입니다.");
                      }}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel className="outline-none ring-white ring-opacity-60 ">
              <div className="flex">
                요청 <div className="font-bold text-blue-400">{friendList.length}</div>개
              </div>
              <ul>
                {friendRequestList.map((friend) => (
                  <li key={friend.id} className="relative flex justify-between p-3 rounded-md hover:bg-gray-100">
                    <div className="flex">
                      <img src={friend.profile} className="rounded-[50%] h-14 w-14 mr-4" alt="profile" />
                      <div>
                        <div>
                          <span>{friend.nickname}</span>
                          <span className="text-gray-400"> {`(${friend.mbti})`}</span>
                        </div>
                        <div>{friend.introduction}</div>
                      </div>
                    </div>
                    <button
                      className="w-20 px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      onClick={() => {
                        alert("준비중입니다.");
                      }}
                    >
                      수락
                    </button>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default FriendListPage;

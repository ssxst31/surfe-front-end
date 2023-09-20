import React from "react";
import { Tab } from "@headlessui/react";

import type { NextPage } from "next";
import MyFriendList from "components/page/friends/MyFriendList";
import FriendRequestList from "components/page/friends/FriendRequestList";
import FriendReceiveList from "components/page/friends/FriendReceiveList";
import DefaultLayout from "components/layouts/DefaultLayout";

const FriendListPage: NextPage = () => {
  const tabList = ["내 친구", "받은 요청", "보낸 요청"];

  return (
    <DefaultLayout>
      <div className="w-full">
        <Tab.Group>
          <Tab.List className="flex justify-between w-full">
            {tabList.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  selected
                    ? " text-black w-1/2 border-blue-500 border-b-2 border-solid py-2 outline-none"
                    : " text-gray-400 w-1/2 py-2 border-gray-200 border-b-2 border-solid  outline-none"
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2 px-3">
            <Tab.Panel className="outline-none ring-white ring-opacity-60 ">
              <MyFriendList />
            </Tab.Panel>
            <Tab.Panel className="outline-none ring-white ring-opacity-60 ">
              <FriendReceiveList />
            </Tab.Panel>
            <Tab.Panel className="outline-none ring-white ring-opacity-60 ">
              <FriendRequestList />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </DefaultLayout>
  );
};

export default FriendListPage;

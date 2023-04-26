import React from "react";
import { Tab } from "@headlessui/react";

import type { NextPage } from "next";
import FriendList from "components/FriendList";
import FriendRequestList from "components/FriendRequestList";
import FriendReceiveList from "components/FriendReceiveList";

const FriendListPage: NextPage = () => {
  const tabList = ["내 친구", "받은 요청", "보낸 요청"];

  return (
    <div>
      <div className="w-full">
        <Tab.Group>
          <Tab.List className="flex justify-between w-full">
            {tabList.map((tab) => (
              <Tab
                className={({ selected }) =>
                  selected
                    ? " text-black w-1/2 border-blue-400 border-b-2 border-solid py-2"
                    : " text-gray-400 w-1/2 py-2 border-gray-200 border-b-2 border-solid"
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="outline-none ring-white ring-opacity-60 ">
              <FriendList />
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
    </div>
  );
};

export default FriendListPage;

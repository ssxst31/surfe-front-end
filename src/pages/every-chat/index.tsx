import type { NextPage } from "next";
import EveryChat from "components/page/everyChat/EveryChat";
import DefaultLayout from "components/layouts/DefaultLayout";

const EveryChatPage: NextPage = () => {
  return (
    <DefaultLayout>
      <EveryChat roomName="room1" />
    </DefaultLayout>
  );
};

export default EveryChatPage;

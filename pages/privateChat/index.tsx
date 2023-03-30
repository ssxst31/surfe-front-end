import type { NextPage } from "next";
import Chat from "components/Chat";

interface PrivateChatPageProps {
  token: any;
}

const PrivateChatPage: NextPage<PrivateChatPageProps> = () => {
  return <Chat />;
};

export default PrivateChatPage;

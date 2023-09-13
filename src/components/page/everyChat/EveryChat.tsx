import { useState } from "react";

import Chat from "components/common/Chat";
import useLoadMessage from "components/page/everyChat/hooks/useLoadMessage";

interface EveryChatProps {
  roomName: string;
}

const EveryChat = ({ roomName }: EveryChatProps) => {
  const [limit, setLimit] = useState<number>(0);
  const { chatMessageList, loadHistoryChatMessage, historyChatMessageList } = useLoadMessage({ roomName, limit });

  if (!chatMessageList) {
    return <></>;
  }

  return (
    <Chat
      chatMessageList={chatMessageList}
      roomName={roomName}
      loadHistoryChatMessage={() => {
        loadHistoryChatMessage();
        setLimit(limit + 30);
      }}
      limit={limit}
      historyChatMessageList={historyChatMessageList}
    />
  );
};

export default EveryChat;

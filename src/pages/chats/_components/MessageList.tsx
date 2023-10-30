import useMe from "hooks/useMe";
import { ChatMessage } from "type";
import { formatChatDate } from "utils/date";
import Message from "pages/chats/_components/Message";

interface MessageListProps {
  chatMessageList: ChatMessage[];
  historyChatMessageList: ChatMessage[];
}

export default function MessageList({ chatMessageList, historyChatMessageList }: MessageListProps) {
  const { me } = useMe();

  const uniqueChatMessages = [...historyChatMessageList, ...chatMessageList].reduce(
    (uniqueMessages: ChatMessage[], chat) => {
      if (!uniqueMessages.some((msg: ChatMessage) => msg.id === chat.id)) {
        uniqueMessages.push(chat);
      }
      return uniqueMessages;
    },
    [],
  );

  return (
    <>
      {uniqueChatMessages.map((chat) => {
        const createdAt = new Date(chat.createdAt);
        const formattedDate = formatChatDate(createdAt.getTime());
        const hour = String(new Date(createdAt).getHours()).padStart(2, "0");
        const minute = String(new Date(createdAt).getMinutes()).padStart(2, "0");
        const senderTime = hour + ":" + minute;

        return (
          <Message
            key={chat.id}
            formattedDate={formattedDate}
            chat={chat}
            senderTime={senderTime}
            isMyMessage={chat.senderId === me.id}
          />
        );
      })}
    </>
  );
}

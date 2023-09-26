import Avatar from "../../../components/common/Avatar";
import { ChatMessage } from "type";

interface MessageProps {
  formattedDate: string;
  chat: ChatMessage;
  senderTime: string;
  isMyMessage: boolean;
}

export default function Message({ formattedDate, chat, senderTime, isMyMessage }: MessageProps) {
  return (
    <div>
      <div className="mx-auto text-sm text-center">{formattedDate}</div>
      {isMyMessage ? (
        <div className="flex justify-end w-full mb-2">
          <div className="flex flex-col-reverse text-xs mr-1">{senderTime}</div>
          <div className="flex flex-col">
            <div className="max-w-lg p-2 whitespace-pre-wrap break-all bg-indigo-100 rounded-lg -lg:max-w-[12rem] -lg:text-xs text-sm after:content-[''] relative after:absolute after:border-transparent after:border-[16px] after:border-solid after:w-0 after:h-0 after:border-t-0 after:border-r-0 after:border-l-indigo-100 after:right-[-8px] after:top-3">
              {chat.message}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full mb-2">
          <Avatar image={chat.profileImage} width="w-10" height="h-10" pathName={`/user/${chat.senderId}`} />
          <div>
            <div className="text-sm">{chat.nickname}</div>
            <div className="max-w-lg whitespace-pre-wrap p-2 break-all bg-gray-100 rounded-lg -lg:max-w-[12rem] -lg:text-xs text-sm before:content-[''] relative before:absolute before:border-transparent before:border-[16px] before:border-solid before:w-0 before:h-0 before:border-t-0 before:border-l-0 before:border-r-gray-100 before:left-[-8px]">
              {chat.message}
            </div>
          </div>
          <div className="flex flex-col-reverse text-xs">{senderTime}</div>
        </div>
      )}
    </div>
  );
}

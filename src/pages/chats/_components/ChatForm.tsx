import { useState } from "react";

import SendIcon from "assets/icons/send.svg";
import ws from "datasources/ws";
import useMe from "hooks/useMe";

interface ChatFromProps {
  roomName: string;
}

export default function ChatFrom({ roomName }: ChatFromProps) {
  const me = useMe();

  const [inputValue, setInputValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const postMessage = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();

    if (!inputValue) {
      return alert("메시지를 입력해주세요");
    }

    ws.emit("SEND_MESSAGE", {
      content: inputValue,
      memberId: me.id,
      createAt: new Date(),
      roomName,
    });

    setInputValue("");
  };

  return (
    <form className="relative flex w-full -lg:px-5">
      <div className="flex w-full py-3 pr-5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500">
        <textarea
          placeholder="메시지를 입력해주세요."
          className="focus:outline-none scrollbar-hide h-8 w-full resize-none border-none pt-2 pl-4 text-sm"
          onChange={onChange}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && !e.shiftKey) {
              postMessage(e);
            }
          }}
        />
        <button onClick={postMessage}>
          <div className="relative ml-5 w-6 h-6">
            <SendIcon />
          </div>
        </button>
      </div>
    </form>
  );
}

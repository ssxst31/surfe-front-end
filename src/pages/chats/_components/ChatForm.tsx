import SendIcon from "assets/icons/send.svg";

interface ChatFormProps {
  onChange: any;
  postMessage: any;
  inputValue: any;
}

export default function ChatFrom({ onChange, postMessage, inputValue }: ChatFormProps) {
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

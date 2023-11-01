import Link from "next/link";

import useMe from "hooks/useMe";

interface ChatRoom {
  chatRoom: any;
}

const ChatRoom = ({ chatRoom }: ChatRoom) => {
  const { me } = useMe();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().substring(2, 4);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    let hour = date.getHours();
    const isPM = hour >= 12;
    if (hour > 12) {
      hour -= 12;
    }
    hour = Number(hour.toString().padStart(2, "0"));
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = isPM ? "오후" : "오전";

    const formattedDate = `${year}.${month}.${day} ${period} ${hour}:${minutes}`;
    return formattedDate;
  }

  return (
    <div className="py-3">
      <Link
        href={{
          pathname: `/chats/${chatRoom.roomName.split("_").filter((item: any) => item !== String(me.id))[0]}`,
        }}
      >
        <div className="flex justify-between">
          <div className="flex">
            <img
              src="https://i.pinimg.com/550x/f3/c9/6c/f3c96c43766c04eaa1b773eb38ef531e.jpg"
              className="rounded-[50%] h-14 w-14 mr-4"
              alt="profile"
            />
            <div>
              <div>{chatRoom.nickname}</div>
              <div className="text-gray-400 ">{chatRoom.lastMessage}</div>
            </div>
          </div>
          <div className="text-sm text-gray-400">{formatDate(chatRoom.updatedAt)}</div>
        </div>
      </Link>
    </div>
  );
};

export default ChatRoom;

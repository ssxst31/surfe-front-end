import Link from "next/link";
import { useRouter } from "next/router";

import useMe from "hooks/useMe";
import { createProfile } from "utils/profile";

export default function User({ user }: any) {
  const router = useRouter();
  const me = useMe();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <img
          src={
            user.profile
              ? `${createProfile()}` + user.profile
              : "https://i.pinimg.com/236x/70/be/b2/70beb2f42ae1c4cfe7a32ec61a93c2f5.jpg"
          }
          className="rounded-[50%] h-12 w-12 shadow-2xl mr-2 cursor-pointer"
          alt="profile"
          onClick={() => {
            router.push(`/user/${user.id}`);
          }}
        />
        <div className="mr-4 text-sm">{user.nickname}</div>
      </div>
      <Link
        href={{
          pathname: "/privateChat",
          query: { room: user.id },
        }}
      >
        <button className="w-full px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          1대1채팅하기
        </button>
      </Link>
    </div>
  );
}

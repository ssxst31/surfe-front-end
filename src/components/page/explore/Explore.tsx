import Link from "next/link";

import { addLocation } from "pages/api/my";
import PencilIcon from "assets/icons/pencil.svg";
import useMe from "hooks/useMe";
import useGeolocation from "hooks/useGeolocation";
import KakaoMap from "components/common/KakaoMap";
import UserList from "components/UserList";
import Avatar from "components/common/Avatar";
import useNearUserList from "components/page/explore/hooks/useNearUserList";

export default function Explore() {
  const me = useMe();
  const { nearUserList, reloadNearUserList } = useNearUserList();

  const { location, update } = useGeolocation();

  return (
    <div className="relative lg:flex w-[620px] mt-10 -lg:mx-auto -lg:w-full">
      <div className="flex flex-col w-full">
        <KakaoMap
          userListCount={nearUserList?.length ?? 0}
          myLat={location.coordinates?.lat ?? 0}
          myLng={location.coordinates?.lng ?? 0}
        />
        <div className="flex justify-end mt-6">
          <button
            disabled={!location.loaded}
            onClick={async () => {
              if (location.error?.code === 1) {
                return alert("위치 액세스를 허용해 주세요.");
              }
              update();
              await addLocation(location.coordinates?.lat, location.coordinates?.lng);
              await reloadNearUserList();
            }}
            className={`${
              location.loaded ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-100 cursor-default"
            } text-white font-medium rounded-lg text-sm px-5 py-2.5 w-32 lg:mb-44 -lg:mr-3 -lg:mb-5 flex items-center`}
          >
            <div className="w-full text-xs">위치 업데이트</div>
            {!location.loaded && (
              <span role="status" className="ml-0.5">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="lg:fixed right-[calc(50vw-450px)] -lg:px-3 w-[256px] -lg:w-auto">
        <div className="flex justify-between -lg:hidden">
          <div className="flex">
            <Avatar pathName="/setting/profile" width="w-12" height="h-12">
              <PencilIcon color="black" className="w-4 h-4 absolute right-2.5 bottom-1.5" />
            </Avatar>
            <div>
              <div className="text-sm">{me.nickname}</div>
              <div className="text-sm">{me.statusMessage}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Link
            href={{
              pathname: "/my/friends",
            }}
          >
            <button className="px-4 py-2 my-5 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 -lg:hidden">
              친구 관리
            </button>
          </Link>
          <Link
            href={{
              pathname: "/my/chat-rooms",
            }}
          >
            <button className="px-4 py-2 my-5 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 -lg:hidden">
              채팅방 목록
            </button>
          </Link>
        </div>
        <div className="pt-5 font-extrabold border-t border-gray-100 border-solid text-md">
          주변 사람과 채팅해 보세요🙌
        </div>
        <UserList nearUserList={nearUserList} reloadNearUserList={reloadNearUserList} />
        <div className="pt-5 my-2 font-extrabold border-t border-gray-100 border-solid text-md">
          단체 채팅도 한번 둘러보세요✨
        </div>
        <Link
          href={{
            pathname: "/every-chat",
          }}
        >
          <button className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 w-full">
            단체 채팅 입장
          </button>
        </Link>
        <div className="mt-3">
          <button
            onClick={() => {
              alert("준비 중입니다.");
            }}
            className="text-sm text-gray-300"
          >
            이용약관
          </button>
          <div
            onClick={() => {
              alert("준비 중입니다.");
            }}
            className="text-sm text-gray-300"
          >
            개인정보처리방침
          </div>
          <Link href="https://icons8.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300">
            <span className="text-right">icons8에서 아이콘 제공</span>
          </Link>
          <small className="block text-sm text-gray-300">ⓒ 서피 2023 All Rights Reserved.</small>
        </div>
      </div>
    </div>
  );
}

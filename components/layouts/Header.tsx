import React from "react";

import useMe from "hooks/useMe";
import { logOut } from "pages/api/auth";

export default function Header() {
  const me = useMe();

  const signOut = async () => {
    await logOut();
    return location.reload();
  };

  return (
    <div className="fixed flex justify-between w-full bg-blue-400 h-14 z-[2]">
      <div>surFe</div>
      {me ? (
        <div>
          {`${me.nickname} (${me.email})`}
          <button onClick={signOut}>로그아웃</button>
        </div>
      ) : (
        <span>로그인해주세요</span>
      )}
    </div>
  );
}

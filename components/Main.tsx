import React from "react";

import Total from "components/NonMain";
import Main2 from "components/Main2";
import useMe from "hooks/useMe";

export default function Main() {
  const me = useMe();
  return me ? (
    <div>
      <Main2 me={me} />
    </div>
  ) : (
    <div className="flex flex-col items-center h-screen">
      <Total />
    </div>
  );
}

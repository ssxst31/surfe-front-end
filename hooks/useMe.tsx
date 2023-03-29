import { useContext } from "react";

import MemberContext from "contexts/member";

export default function useMe(): any {
  const contextState = useContext(MemberContext);

  return contextState;
}

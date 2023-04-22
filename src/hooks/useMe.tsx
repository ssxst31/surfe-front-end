import { useContext } from "react";
import { useRecoilValueLoadable, RecoilEnv } from "recoil";

import MemberContext from "contexts/member";
import { myProfileSelector } from "store";

export const IS_LOADING = 0;

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

function getReturnValue(loadable: any, defaultValue: any) {
  switch (loadable.state) {
    case "hasValue":
      const value = loadable.contents;
      if (!value) {
        if (defaultValue) return defaultValue;
      }
      return loadable.contents;
    case "loading":
      if (defaultValue) return defaultValue;
      return IS_LOADING;
    case "hasError":
      return null;
  }
}

export default function useMe() {
  const loadable = useRecoilValueLoadable(myProfileSelector);
  const contextState = useContext(MemberContext);

  return getReturnValue(loadable, contextState);
}

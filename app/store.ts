import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const meState = atom<string>({
  key: "me",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

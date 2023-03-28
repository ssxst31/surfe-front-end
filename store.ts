import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const meState = atom<any>({
  key: "me",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

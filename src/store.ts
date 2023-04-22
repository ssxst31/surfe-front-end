import { atom, selector } from "recoil";

import { fetchProfile } from "pages/api/my";

const myProfileQuery = selector({
  key: "myProfileQuery",
  get: async () => {
    if (typeof window === "undefined") return null;

    return fetchProfile();
  },
});

const myProfileState = atom({
  key: "myProfileState",
  default: myProfileQuery,
});

export const myProfileSelector = selector({
  key: "myProfileSelector",
  get: ({ get }) => {
    return get(myProfileState);
  },
  set: ({ set }, newValue) => set(myProfileState, newValue),
});

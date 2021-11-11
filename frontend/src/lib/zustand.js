import create from "zustand";
import { devtools } from "zustand/middleware";

import { createSSUSlice } from "$modules/SelfSignUp/store/createSSUSlice";
export const useStore = create(
  devtools((set, get) => ({
    ...createSSUSlice(set, get),
  }))
);

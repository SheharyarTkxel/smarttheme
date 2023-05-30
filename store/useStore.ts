import { create } from "zustand";
import userSlice from "./slices/user.slice";
import { User } from "./types/user";

export const useStore = create<User>((...a) => ({
  ...userSlice(...a),
}));

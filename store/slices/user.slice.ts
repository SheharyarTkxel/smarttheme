import { StateCreator } from "zustand";
import { User, UserProps } from "../types/user";

const userSlice: StateCreator<User> = (set, get) => ({
  user: null,
  setUser(user: UserProps) {
    set(() => ({ user }));
  },
});

export default userSlice;

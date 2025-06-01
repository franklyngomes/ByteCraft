import { create } from "zustand";

const useStore = create((set) => ({
  token: "",
  user: {},
  updateUser: (user: any) => set(() => ({ user: user })),
  updateToken: (token: any) => set(() => ({ token: token })),
}));
export default useStore;

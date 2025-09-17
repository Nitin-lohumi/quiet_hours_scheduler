import { create } from "zustand";
type User = {
  id: string;
  email: string;
};
interface State {
  user: User | null;
  setUser: (data: User) => void;
  clearUser: () => void;
}
export const UseStores = create<State>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
  clearUser: () => set({ user: null }),
}));


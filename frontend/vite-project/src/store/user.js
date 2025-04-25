import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { USER_STORE_PERSIST } from "../const/doctor";

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      {
        name: USER_STORE_PERSIST, // unique key in storage
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useUserStore;

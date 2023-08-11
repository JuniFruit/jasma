import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useAuthStore = create(
    devtools(
        immer((set) => ({
            user: null,
            setUser: (data) => set({ user: data }),
            clearUser: () => set({ user: null }),
            updateUser: (newData) =>
                set((state) => {
                    return { ...state, ...newData };
                })
        }))
    )
);

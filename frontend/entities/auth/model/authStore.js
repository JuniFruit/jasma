import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useAuthStore = create(
    devtools(
        immer((set) => ({
            user: null,
            isRequestingAuth: true,
            isError: false,
            error: "",
            setUser: (data) => set({ user: data }),
            clearUser: () => set({ user: null }),
            setLoading: (value) => set({ isRequestingAuth: value }),
            setError: (isError, error) => set({ isError, error }),
            updateUser: (newData) =>
                set((state) => {
                    return { ...state, ...newData };
                })
        }))
    )
);

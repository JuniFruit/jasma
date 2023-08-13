import { useAuthStore } from "@/entities/auth";
import { handleCheckAuth } from "@/features/auth/login";
import { handleError } from "@/shared/utils";
import { useEffect } from "react";
import { useToast } from "../hooks/useToast";

export const AuthProvider = ({ children }) => {
    const store = useAuthStore();
    const { notifyToast } = useToast();
    const { isSuccess, data, isError, error } = handleCheckAuth();
    useEffect(() => {
        store.setError(isError, handleError(error).message);
        if (isSuccess) {
            if (data.data.isAuth) {
                store.setUser(data.data.user);

                notifyToast(`Welcome back ${data.data.user.username}`);
            } else {
                store.clearUser();
            }
            store.setLoading(false);
        }
    }, [isSuccess, isError]);
};

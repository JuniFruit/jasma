import { useAuthStore } from "@/entities/auth";
import { handleCheckAuth } from "@/features/auth/login";
import { useToast } from "../hooks/useToast";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const AuthProvider = ({ children }) => {
    const store = useAuthStore();
    const { notifyToast } = useToast();
    const { isSuccess, data } = handleCheckAuth();
    const router = useRouter();
    useEffect(() => {
        if (isSuccess) {
            if (data.data.isAuth) {
                store.setUser(data.data.user);
                notifyToast(`Welcome back ${data.data.user.username}`);
                router.push("/dashboard");
            } else {
                store.clearUser();
            }
        }
    }, [isSuccess]);

    return <>{children}</>;
};

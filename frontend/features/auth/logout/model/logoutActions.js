import { logout, useAuthStore } from "@/entities/auth";
import { useMutation } from "react-query";

const handleLogout = () => {
    const { clearUser } = useAuthStore();
    return useMutation(logout, { onSuccess: () => clearUser() });
};

export { handleLogout };

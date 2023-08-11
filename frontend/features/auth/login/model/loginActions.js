import { checkAuth, login, useAuthStore } from "@/entities/auth";
import { DEFAULTS } from "@/shared/api/queryConfigs";
import { useMutation, useQuery, useQueryClient } from "react-query";

const handleLogin = () => {
    const store = useAuthStore();

    return useMutation(login, {
        onSuccess: (user) => {
            store.setUser(user);
        }
    });
};

const handleCheckAuth = () => {
    return useQuery("auth", checkAuth, {
        ...DEFAULTS
    });
};

export { handleLogin, handleCheckAuth };

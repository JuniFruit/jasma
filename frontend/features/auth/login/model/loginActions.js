import { checkAuth, login } from "@/entities/auth";
import { DEFAULTS } from "@/shared/api/queryConfigs";
import { useMutation, useQuery } from "react-query";

const handleLogin = () => {
    return useMutation(login, {
        ...DEFAULTS
    });
};

const handleCheckAuth = () => {
    return useQuery("auth", checkAuth, {
        ...DEFAULTS
    });
};

export { handleCheckAuth, handleLogin };

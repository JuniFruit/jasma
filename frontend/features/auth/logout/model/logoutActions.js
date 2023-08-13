import { logout } from "@/entities/auth";
import { useMutation } from "react-query";

const handleLogout = () => {
    return useMutation(logout);
};

export { handleLogout };

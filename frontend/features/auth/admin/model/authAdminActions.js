import { checkAuth, checkAuthUserRole, useAuthStore } from "@/entities/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { handleError } from "@/shared/utils";

/**
 *
 * @param {String} redirectPath relative path if user is NOT authorized. Example: "/cms/cms-login". Default is home page: '/'
 * @param {String} successRedirectPath relative path if user is authorized. Example: "/cms/cms-login". Empty string to stay on the page. Default is ""
 * @param {String} requiredRole required role to pass. Default is "normal"
 */

const useCheckAuthClientSide = (redirectPath = "/", successRedirectPath = "", requiredRole = "normal") => {
    const router = useRouter();
    const { user } = useAuthStore();
    useEffect(() => {
        if (user && user.user_role === requiredRole) {
            router.replace(successRedirectPath);
        } else {
            router.replace(redirectPath);
        }
    }, [user]);
};

const handleCheckAuthUserRole = async () => {
    try {
        const response = await checkAuthUserRole();
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export { useCheckAuthClientSide, handleCheckAuthUserRole };

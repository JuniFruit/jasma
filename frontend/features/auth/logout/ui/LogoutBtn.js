import { useAuthStore } from "@/entities/auth/index.js";
import { useToast } from "@/shared/model/index.js";
import { handleError } from "@/shared/utils/handleError.js";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { handleLogout } from "../model/logoutActions.js";

export function LogInOutBtn(props) {
    const router = useRouter();
    const { user: isLoggedIn } = useAuthStore();
    const { notifyToast } = useToast();
    const { clearUser } = useAuthStore();

    const { mutate, isSuccess, isError, error } = handleLogout();

    useEffect(() => {
        if (isSuccess) {
            clearUser();
            notifyToast("You have successfully logged out.");
        }
        if (isError) notifyToast(handleError(error).message, true);
    }, [isError, isSuccess]);

    const logoutUser = async (e) => {
        mutate();
    };

    //Choose which button (login btn or logout btn) to render based on logged in or logged out state
    return (
        <React.Fragment>
            {isLoggedIn ? (
                <button
                    className="formButtonDefault m-2"
                    onClick={logoutUser}
                >
                    Logout
                </button>
            ) : (
                <Link href="/login">
                    <button className="formButtonDefault m-2">Login</button>
                </Link>
            )}
        </React.Fragment>
    );
}

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { handleLogin } from "../model/loginActions.js";
import { handleError } from "@/shared/utils/";
import { useAuthStore } from "@/entities/auth/index.js";

export function LoginForm() {
    const router = useRouter();
    const store = useAuthStore();
    // Values of the email and password input boxes
    const [loginFormState, setLoginFormState] = useState({
        emailInput: "",
        passwordInput: ""
    });
    const { mutate, data, isError, isLoading, error, isSuccess } = handleLogin();

    useEffect(() => {
        if (isSuccess) {
            store.setUser(data.user);
            router.replace("/dashboard");
        }
    }, [isSuccess]);

    const errorObj = isError ? handleError(error) : {};

    //Login authorization code
    async function handleSubmit(e) {
        e.preventDefault();
        const { emailInput, passwordInput } = loginFormState;
        mutate({ email: emailInput, password: passwordInput });
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setLoginFormState({
            ...loginFormState,
            [e.target.name]: value
        });
    };

    return (
        <div className="flex flex-col items-center justify-center my-16">
            <h1 className="my-4">Login</h1>
            <h3 className="my-2">
                Not yet registered?{" "}
                <Link
                    className="hover:text-sky-500"
                    href="/register"
                >
                    Register
                </Link>
            </h3>

            <form
                className="bg-gray-600  shadow-md rounded px-8 pt-6 pb-8 mb-4"
                action="#"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label
                        className="labelDefault"
                        htmlFor="emailInput"
                    >
                        email
                    </label>
                    <input
                        id="loginEmailInput"
                        type="email"
                        placeholder="Email"
                        name="emailInput"
                        value={loginFormState.emailInput}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="labelDefault"
                        htmlFor="passwordInput"
                    >
                        Password
                    </label>
                    <input
                        id="loginPasswordInput"
                        type="password"
                        placeholder="Password"
                        name="passwordInput"
                        value={loginFormState.passwordInput}
                        onChange={handleChange}
                        required
                    />
                </div>

                {errorObj.errors ? (
                    <p className="mb-2 text-red-500">{errorObj.errors[0].message}</p>
                ) : errorObj.message ? (
                    errorObj.message
                ) : null}

                <div className="flex flex-col items-center justify-between">
                    <button
                        id="loginSubmitBtn"
                        className="formButtonDefault"
                        type="submit"
                        value="Log in"
                    >
                        {isLoading ? "Sending..." : "Log in"}
                    </button>
                </div>

                <a
                    className="flex flex-col items-center mt-4 hover:text-sky-500"
                    href="#"
                >
                    Forgot password?
                </a>
            </form>
        </div>
    );
}

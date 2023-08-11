import { AxiosError } from "axios";

const IS_DEVMODE = process.env.NEXT_PUBLIC_NODE_ENV === "development";

/**
 *
 * @param {AxiosError / Error} error
 * @returns {Object} {error: Boolean, message: String}
 */

export const handleError = (error) => {
    const errRes = Object.create(null);
    errRes.error = true;

    // For debugging
    if (IS_DEVMODE) console.error(error);

    if (error?.name === "AxiosError") {
        const res = error.response;

        if (res.status === 500) {
            errRes.message = "Something went wrong!";
            return errRes;
        }

        const data = res.data;

        if (data?.message) {
            errRes.message = data.message;
            return errRes;
        }

        if (data?.errors && data.errors.length) {
            errRes.errors = data.errors;
            errRes.message = "Action is not successfull!";
            return errRes;
        }
    }

    if (error instanceof Error) {
        errRes.message = "Something went wrong!";
        return errRes;
    }

    errRes.message = "Unknown Error!";
    return errRes;
};

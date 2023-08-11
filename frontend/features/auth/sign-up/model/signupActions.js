import { handleError } from "@/shared/utils";
import { register } from "@/entities/auth";
import { useMutation } from "react-query";

/**
 *
 * @param {String} username
 * @param {String} email
 * @param {String} password
 */
const handleSignup = () => useMutation(register);

export { handleSignup };

import axios from "axios";

let baseURL = "";
if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    baseURL = `http://${process.env.NEXT_PUBLIC_API_SERVER_URL}`;
}
//In production the Nginx reverse proxy will redirect traffic to the correct port.
else if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
    baseURL = `https://${process.env.NEXT_PUBLIC_API_SERVER_URL}`;
}

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 9000, //Timeout response after 9 seconds
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "x-csrftoken"
});

export const api = axiosInstance;

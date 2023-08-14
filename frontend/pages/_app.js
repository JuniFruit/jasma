import { AuthProvider, MobileProvider } from "@/shared/model";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../app/layouts/BaseLayout";
import "../shared/styles/global.scss";

function MyApp({ Component, pageProps }) {
    const [queryClient] = React.useState(() => new QueryClient());

    const paypalClientID =
        process.env.NEXT_PUBLIC_NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_PRODUCTION
            : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX;

    return (
        <QueryClientProvider client={queryClient}>
            <MobileProvider pageProps={pageProps}>
                <ToastContainer />
                <AuthProvider />
                <PayPalScriptProvider options={{ "client-id": paypalClientID }}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </PayPalScriptProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </MobileProvider>
        </QueryClientProvider>
    );
}

export default MyApp;

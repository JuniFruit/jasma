import { useMobileProvider } from "@/shared/model";
import FooterMain from "@/widgets/footer";
import { MetaHead } from "../MetaHead";
import Nav from "../Nav";
import { useAuthStore } from "@/entities/auth";
import { Spinner } from "@/shared/ui";

export default function Layout({ children }) {
    const { isMobile } = useMobileProvider();
    const { isRequestingAuth } = useAuthStore();
    if (isRequestingAuth) return <Spinner />;
    return (
        <>
            <MetaHead isMobile={isMobile} />
            <header>
                <Nav />
            </header>
            <div className="min-h-screen w-full">
                <main className="min-h-screen">
                    {/* <HeaderMain /> */}
                    {children}
                </main>
                <FooterMain />
            </div>
        </>
    );
}

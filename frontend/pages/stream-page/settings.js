import { useCheckAuthClientSide } from "@/features/auth/admin";
import { MobileDetectSSR, useMobileProvider } from "@/shared/model";
import StreamSettings from "@/widgets/stream-settings";
import { useRouter } from "next/router";
import styles from "./LivePage.module.scss";
/* For now users can adjust stream setting only on a desktop version */

const Settings = () => {
    useCheckAuthClientSide("/login");
    const { isMobile } = useMobileProvider();
    const router = useRouter();

    if (isMobile) {
        router.replace("/");
        return null;
    }

    return (
        <div className={styles.stream_page_lg}>
            <div className={styles.stream_content}>
                <StreamSettings />
            </div>
        </div>
    );
};

export default Settings;

export const getServerSideProps = async (ctx) => {
    const { isMobile } = MobileDetectSSR(ctx);
    return {
        props: { isSSRMobile: isMobile }
    };
};

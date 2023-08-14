import { MobileDetectSSR } from "@/shared/model";
import StreamListWidgets from "@/widgets/stream-list";
import styles from "./LivePage.module.scss";
import StreamSearchWidgets from "@/widgets/stream-search";

function Live() {
    return (
        <div className={styles.stream_page_lg}>
            <div className={styles.stream_content}>
                <StreamSearchWidgets.StreamSearch />
                <StreamListWidgets.CategoriesList />
                <StreamListWidgets.TopChannelsList />
                <StreamListWidgets.LiveList />
            </div>
        </div>
    );
}

export default Live;

export const getServerSideProps = async (ctx) => {
    const { isMobile } = MobileDetectSSR(ctx);
    return {
        props: { isSSRMobile: isMobile }
    };
};

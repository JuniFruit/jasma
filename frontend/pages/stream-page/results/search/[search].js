import { MobileDetectSSR } from "@/shared/model";
import StreamSearchWidgets from "@/widgets/stream-search";
import styles from "../../LivePage.module.scss";
const GeneralSearchResults = () => {
    return (
        <div className={styles.stream_page_lg}>
            <div className={styles.stream_content}>
                <StreamSearchWidgets.StreamSearch />
                <StreamSearchWidgets.StreamSearchResults />
            </div>
        </div>
    );
};

export const getServerSideProps = async (ctx) => {
    const { isMobile } = MobileDetectSSR(ctx);
    return {
        props: { isSSRMobile: isMobile }
    };
};

export default GeneralSearchResults;

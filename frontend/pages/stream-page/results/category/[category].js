import React from "react";
import styles from "../../LivePage.module.scss";
import { MobileDetectSSR } from "@/shared/model";
import { useRouter } from "next/router";
import StreamListWidgets from "@/widgets/stream-list";
import StreamSearchWidgets from "@/widgets/stream-search";

const CategorySearchResults = () => {
    const router = useRouter();
    return (
        <div className={styles.stream_page_lge}>
            <div className={styles.stream_content}>
                <StreamSearchWidgets.StreamSearch />
                <StreamListWidgets.LiveList category={router.query.category} />
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

export default CategorySearchResults;

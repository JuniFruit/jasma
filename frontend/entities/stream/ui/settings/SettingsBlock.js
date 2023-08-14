import styles from "./Settings.module.scss";

export const SettingsBlock = ({ title = "", action = null, description = null }) => {
    return (
        <div className={styles.setting_block_container}>
            <div className={styles.title_wrapper}>
                <h2>{title}</h2>
            </div>
            <div className={styles.main_wrapper}>
                <div className={styles.action_block}>{action ? action : null}</div>
                <div className={styles.description_block}>{description ? description : null}</div>
            </div>
        </div>
    );
};

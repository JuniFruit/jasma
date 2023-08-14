import styles from "./Wrappers.module.scss";

export const SettingsWrapper = ({ title, children }) => {
    return (
        <div className={styles.settings_content}>
            <div className={styles.settings_wrapper}>
                <h3>{title}</h3>
                <div className={styles.settings_content}>{children}</div>
            </div>
        </div>
    );
};

import styles from "./Loading.module.scss";

export const Spinner = ({ className }) => {
    return (
        <div className={`${styles.lds_ring} ${className}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export const Spinner2 = () => {
    const points = new Array(11).fill(null);
    return (
        <div className={styles.spinner2_container}>
            {points.map((point, ind) => (
                <div key={ind}></div>
            ))}
        </div>
    );
};

import { InputField, Spinner, Spinner2 } from "@/shared/ui";
import styles from "./Inputs.module.scss";
import { useMemo, useRef } from "react";
import { tr } from "date-fns/locale";

export const StreamCoreInput = (props) => {
    return (
        <div className={styles.core_text_input}>
            <InputField {...props} />
        </div>
    );
};

export const StreamCoreBtn = ({ children, isLoading, isError, ...rest }) => {
    const container = useRef(null);

    const getSize = useMemo(() => {
        if (!container.current) return;

        return container.current.getBoundingClientRect();
    }, [container.current]);

    return (
        <button
            ref={container}
            {...rest}
            disabled={isLoading}
            className={`${styles.stream_core_btn} ${isError ? styles.btn_error_animation : ""}`}
            style={{ width: getSize?.width, height: getSize?.height }}
        >
            {isLoading ? <Spinner2 /> : children}
        </button>
    );
};

export const StreamActionBtn = ({ children, ...rest }) => {
    return (
        <button
            {...rest}
            className={styles.stream_action_btn}
        >
            {children}
        </button>
    );
};

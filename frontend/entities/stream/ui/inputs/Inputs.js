import { InputField, Spinner2 } from "@/shared/ui";
import { useMemo, useRef, useState } from "react";
import styles from "./Inputs.module.scss";
import { useClickOutside } from "@/shared/model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

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
        const width = container.current.offsetWidth;
        const height = container.current.offsetHeight;

        return { width, height };
    }, [container.current]);

    return (
        <button
            ref={container}
            {...rest}
            disabled={isLoading}
            className={`${styles.stream_core_btn} ${isError ? styles.btn_error_animation : ""} ${
                isLoading ? styles.loading : ""
            }`}
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

export const StreamSelect = ({ children, ...rest }) => {
    return (
        <button
            {...{ ...rest }}
            className={styles.select_wrapper}
        >
            {children}
            <span className={styles.caret_wrapper}>
                {/* <IoCaretUpSharp /> */}
                {/* <IoCaretDownSharp /> */}
            </span>
        </button>
    );
};

export const StreamOptionList = ({ children }) => {
    return (
        <ul
            className={styles.options_box}
            role="listbox"
            aria-orientation="vertical"
        >
            {children}
        </ul>
    );
};

export function StreamOption({ value, description = "", thumbnailSrc = "", isSelected = false, onSelect }) {
    const handleKeyDown = (e) => {
        if (e.code === "Enter") onSelect(value);
    };
    return (
        <li
            className={styles.option_wrapper}
            tabIndex={0}
            onClick={() => onSelect(value)}
            onKeyDown={handleKeyDown}
            aria-selected={isSelected}
            aria-current={isSelected}
            role="option"
        >
            <div className={`${styles.thumb_container}`}>
                {thumbnailSrc ? <img src={thumbnailSrc}></img> : <FontAwesomeIcon icon={faCheckCircle} />}
            </div>
            <div className={styles.value_wrapper}>
                <span>{value}</span>
                {description ? <p>{description}</p> : null}
            </div>
        </li>
    );
}

export const StreamDropdown = ({ currentValue, optionList, isError = false, error = "", isLoading }) => {
    const { ref, isShow, setIsShow } = useClickOutside(false);

    const showError = () => {
        return <h3 className={styles.dropdown_error}>{error}</h3>;
    };

    return (
        <div
            className="relative"
            ref={ref}
        >
            <StreamSelect
                onClick={() => setIsShow(!isShow)}
                aria-haspopup={true}
                aria-expanded={isShow}
                type="button"
            >
                {currentValue}
            </StreamSelect>
            {isShow && optionList ? (
                <div className="relative">{isError ? showError() : isLoading ? <Spinner2 /> : optionList}</div>
            ) : null}
        </div>
    );
};

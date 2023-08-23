import { SettingsBlock, StreamActionBtn, StreamCoreBtn, StreamCoreInput } from "@/entities/stream";
import { useToast } from "@/shared/model";
import { copyToClipboard, handleError } from "@/shared/utils";
import { useEffect, useState } from "react";
import { handleGenerateStreamKey } from "../../model/actions";
import "./Settings.css";
import { Description } from "./Shared";

export const StreamKey = ({ userID, streamKey }) => {
    return (
        <SettingsBlock
            title="Stream Key"
            action={
                <KeyField
                    userID={userID}
                    streamKey={streamKey}
                />
            }
            description={<KeyFieldDescription />}
        />
    );
};

function GenerateKey({ onGenerate, userID }) {
    const { mutate, isError, isLoading, error } = handleGenerateStreamKey(userID);
    const { notifyToast } = useToast();
    useEffect(() => {
        if (isError) notifyToast(handleError(error).message, true);
    }, [isError]);

    const handleGenerate = async () => {
        // make a call to backend, get generate key. On backend associate key with the user.
        // onGenerate(key);
        mutate();
    };

    return (
        <StreamCoreBtn
            isError={isError}
            isLoading={isLoading}
            onClick={handleGenerate}
        >
            New key
        </StreamCoreBtn>
    );
}

function KeyField({ userID, streamKey }) {
    const [isVisible, setIsVisible] = useState(false);
    const { notifyToast } = useToast();
    const decode = () => {
        return !isVisible ? "••••••••••••••••" : streamKey;
    };

    const handleCopy = () => {
        copyToClipboard(streamKey);
        notifyToast("Key copied");
    };

    return (
        <div className="stream-settings-field">
            <div className="stream-settings-field-wrapper">
                <StreamCoreInput value={decode()} />

                <StreamCoreBtn
                    className={"px-2 py-1.5"}
                    onClick={handleCopy}
                >
                    Copy
                </StreamCoreBtn>

                <GenerateKey userID={userID} />
            </div>
            <StreamActionBtn onClick={() => setIsVisible(!isVisible)}>{isVisible ? "hide" : "show"}</StreamActionBtn>
        </div>
    );
}

function KeyFieldDescription() {
    return (
        <Description>
            <p>
                To start streaming through <b>OBS</b> specify server{" "}
                <span className="font-bold text-stream-accent">rtmp://localhost:1935/live</span> and add your{" "}
                <b>stream key</b>
            </p>
        </Description>
    );
}

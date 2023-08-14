import { StreamKey, handleGetStreamerProfile } from "@/features/stream";
import styles from "./StreamSettings.module.scss";
import { useAuthStore } from "@/entities/auth";
import { useEffect } from "react";
import { useToast } from "@/shared/model";
import { handleError } from "@/shared/utils";
import { SettingsWrapper } from "@/entities/stream";

export const StreamSettings = () => {
    const { user } = useAuthStore();
    const { notifyToast } = useToast();
    const { data, isError, error, isSuccess } = handleGetStreamerProfile(user?.id);

    useEffect(() => {
        if (isError) notifyToast(handleError(error).message);
    }, [isError]);

    if (!user) return null;
    console.log(data);
    return (
        <div className={styles.stream_settings_widget}>
            <h2>{user?.username}'s settings</h2>
            <SettingsWrapper title={"Edit your streamer profile settings"}>
                {!isSuccess ? null : (
                    <>
                        <StreamKey
                            userID={user?.id}
                            streamKey={data.stream_key}
                        />
                    </>
                )}
            </SettingsWrapper>
        </div>
    );
};

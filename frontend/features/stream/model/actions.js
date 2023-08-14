import {
    generateStreamKey,
    getCategories,
    getLiveSearchResults,
    getLiveStreams,
    getStreamerProfile
} from "@/entities/stream";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DEFAULTS } from "@/shared/api/queryConfigs";
import { handleError } from "@/shared/utils/handleError";

export const handleGenerateStreamKey = (userId) => {
    const queryClient = useQueryClient();

    return useMutation(generateStreamKey, {
        onSuccess: (data) => {
            queryClient.setQueryData(["streamer", userId], (oldData) =>
                oldData ? { ...oldData, stream_key: data } : oldData
            );
        }
    });
};

/**
 *
 * @param {String} category query specified category. Defaluts to any
 * @param {Number} page query with page number. Defaults to 1
 * @returns
 */
export const handleGetLiveStreams = (category = "", page = 1) => {
    return useQuery(["liveList", category], () => getLiveStreams(category, page), {
        enabled: true,
        ...DEFAULTS
    });
};

export const handleStreamSearch = (searchTerm) => {
    return useQuery(
        ["liveSearchResults"],
        async () => {
            return getLiveSearchResults(searchTerm);
        },
        {
            enabled: true,
            ...DEFAULTS
        }
    );
};

/**
 * Get stream categories
 * @returns
 */

export const handleGetCategories = () => {
    return useQuery("live_categories", getCategories, { enabled: true, onError: handleError, ...DEFAULTS });
};

/**
 *
 * @param {String} userId
 */

export const handleGetStreamerProfile = (userId) => {
    return useQuery(["streamer", userId], async () => await getStreamerProfile(userId), {
        ...DEFAULTS
    });
};

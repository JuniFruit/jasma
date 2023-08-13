import {
    addFollower,
    changeUserRole,
    checkIsFollowing,
    getClientUser,
    getFollowers,
    getFollowing,
    getProfilePic,
    getUserID,
    getUserInfoById,
    removeFollower,
    uploadProfilePic
} from "@/entities/user";
import { DEFAULTS } from "@/shared/api/queryConfigs";
import { createMultipartData, handleError } from "@/shared/utils";
import { useQuery } from "react-query";

const useGetUserPicture = (userID) => {
    return useQuery(
        [`profilePic_${userID}`],
        async () => {
            return await getProfilePic(userID);
        },
        {
            ...DEFAULTS
        }
    );
};

/**
 * Get full user profile info
 * @param {String} id
 * @returns
 */

const handleGetFullUserInfo = (id) => {
    return useQuery(["user_info"], async () => await getUserInfoById(id), {
        ...DEFAULTS
    });
};

const handleGetUser = async () => {
    try {
        const res = await getClientUser();
        return res;
    } catch (error) {
        return handleError(error);
    }
};

/**
 *
 * @param {String} userID_two id of user to follow??
 * @returns
 */

const handleSetFollow = async (userID_two) => {
    try {
        const res = await addFollower(userID_two);
        return res;
    } catch (error) {
        return handleError(error);
    }
};

/**
 *
 * @param {String} userID_two id of user to follow??
 * @returns
 */

const handleUnfollow = async (userID_two) => {
    try {
        const res = await removeFollower();
        return res;
    } catch (error) {
        return handleError(error);
    }
};

/**
 *
 * @param {*} file image from user's input
 * @returns
 */

const handleUploadUserPic = async (file) => {
    try {
        const multipartData = createMultipartData({ context: "avatar" }, file);
        const res = await uploadProfilePic(multipartData);
        return res;
    } catch (error) {
        return handleError(error);
    }
};

/**
 *
 * @param {String} userID
 * @returns
 */

const useGetFollowers = (userID) =>
    useQuery(
        [`followers_${userID}`],
        async () => {
            return await getFollowers(userID);
        },
        {
            ...DEFAULTS
        }
    );

/**
 *
 * @param {String} userID
 * @returns
 */

const useGetFollowing = (userID) =>
    useQuery(
        [`followees_${userID}`],
        async () => {
            return await getFollowing(userID);
        },
        {
            ...DEFAULTS
        }
    );

/**
 *
 * @param {String} userID_two  id of user to check
 * @returns
 */

const handleCheckIsFollowing = async (userID_two) => {
    try {
        const res = await checkIsFollowing(userID_two);
        return res;
    } catch (error) {
        return handleError(error);
    }
};

/**
 *
 * @param {String} roleFilter
 * @returns
 */

const useGetUserIDsByRole = (roleFilter) =>
    useQuery(
        [`UserIDS_${roleFilter}`],
        async () => {
            return await api.getUserIDsByRole(roleFilter);
        },
        {
            ...DEFAULTS
        }
    );

/**
 *
 * @param {String} user_id
 * @param {String} role
 * @returns
 */

const handleChangeUserRole = async (user_id, role) => {
    try {
        const response = changeUserRole(user_id, role);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

/**
 *
 * Get the userID from a username
 * @param {String} username
 * @returns
 */
const useGetUserID = (username) =>
    useQuery(
        [`${username}`],
        async () => {
            return await getUserID(username);
        },
        {
            ...DEFAULTS
        }
    );

/**
 *
 * @param {String} userID
 * @returns
 */

const useGetUserInfo = (userID) =>
    useQuery(
        [`${username}`],
        async () => {
            return await api.getUserInfo(userID);
        },
        {
            ...DEFAULTS
        }
    );

export {
    handleChangeUserRole,
    handleCheckIsFollowing,
    handleGetFullUserInfo,
    handleGetUser,
    handleSetFollow,
    handleUnfollow,
    handleUploadUserPic,
    useGetFollowers,
    useGetFollowing,
    useGetUserID,
    useGetUserIDsByRole,
    useGetUserInfo,
    useGetUserPicture
};

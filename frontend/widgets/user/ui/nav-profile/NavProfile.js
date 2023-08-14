import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";

import { DropDownBtn } from "@/shared/ui";
import { handleGetFullUserInfo, handleGetUser } from "@/features/user";
import { LogInOutBtn } from "@/features/auth/logout";
import { userState } from "@/entities/theme";
import { ProfilePic } from "../profile-picture/ProfilePic";
import { useAuthStore } from "@/entities/auth";

export const NavProfile = () => {
    const { user } = useAuthStore();

    const { data, isSuccess } = handleGetFullUserInfo(user?.id);
    return (
        <div>
            <DropDownBtn
                style="flex flex-col"
                dropDownStyle="flex flex-col p-2 m-1 w-1/2 bg-gray-900 place-self-end"
                addIcon={false}
                replacementIcon={
                    <React.Fragment>
                        <ProfilePic
                            userID={user ? user.id : null}
                            width="30"
                            height="30"
                        />
                    </React.Fragment>
                }
            >
                {user ? (
                    <React.Fragment>
                        <Link href={`/user/${user.username}`}>Profile page</Link>
                        <Link href="/user/settings">
                            <button className="formButtonDefault m-2">Settings</button>
                        </Link>
                        <LogInOutBtn initialState={user ? true : false} />
                        {isSuccess && !data.data.streamerprofile ? (
                            <Link
                                href={"/stream-page/settings"}
                                className="formButtonDefault m-2"
                            >
                                Become a streamer
                            </Link>
                        ) : null}
                    </React.Fragment>
                ) : null}
            </DropDownBtn>
        </div>
    );
};

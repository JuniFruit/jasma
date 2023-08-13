import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LogInOutBtn } from "@/features/auth/logout";
import { ProfilePic } from "../profile-picture/ProfilePic";
import { useAuthStore } from "@/entities/auth";

/* DONT KNOW WHAT TO CALL THIS COMPONENT */
export function UserBox(props) {
    const { user } = useAuthStore();

    return (
        <div className="">
            <div className="flex flex-col items-end justify-end mr-4">
                {user ? (
                    <React.Fragment>
                        <Link href={`/user/${user.username}`}>
                            <ProfilePic
                                userID={user?.id}
                                width={75}
                                height={75}
                            />
                        </Link>
                        <Link href="/user/settings">
                            <button className="formButtonDefault m-2">Settings</button>
                        </Link>
                    </React.Fragment>
                ) : null}

                <LogInOutBtn initialState={!!user} />
            </div>
        </div>
    );
}

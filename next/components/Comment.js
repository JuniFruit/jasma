import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import { formatDistance } from 'date-fns';
import api from "../clientAPI/api.js";
import ProfilePic from "./ProfilePic";

export default function Comment(props) {
    const { commentData } = props;

    const deleteComment = async () => {
        const res = await api.deleteComment(commentData.comment_id);
        console.log(res);
    }

    const EditComment = () => {
        console.log("Editing comments does not work yet.")
    }

    return (
        <div className="p-2 m-2 bg-gray-800">
            {(window.sessionStorage.getItem('loggedInUserID') === commentData.user_id) ? (
                <React.Fragment>
                <button className="formButtonDefault outline-white border mr-1" onClick={deleteComment}>Delete</button>
                <button className="formButtonDefault outline-white border" onClick={EditComment}>Edit</button>
                </React.Fragment>) 
            : null}
            <ProfilePic 
                userID={commentData.user_id} 
                width={32} 
                height={32} 
            />
            <Link
                className="font-bold"
                href={`/user/${commentData.username}`}
            >
                {commentData.username}
            </Link>

            <p className="mb-2">{commentData.comment_text}</p>
            {commentData.file_url ? 
                <Image
                    src={commentData.file_url} 
                    className="object-scale-down mb-1"
                    alt="Comment picture"
                    width="999" 
                    height="999"
                />
                : null}
            <p className="text-xs">{commentData.created_at}</p>
            <p className="text-xs">{formatDistance(new Date(commentData.created_at), new Date())} a go.</p>
        </div>
    );
}

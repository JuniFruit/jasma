import React from 'react';
import Image from 'next/image';
import { useQuery } from 'react-query';
import api from "../clientAPI/api.js";

export default function ProfilePic(props) {

    //rounded-t-full (css)

    const { userID } = props;

    //Fetch profile pic from server
    const { status, isLoading, isError, data, error, refetch } = useQuery([`profilePic_${userID}`], 
    async () => {return await api.getProfilePic(userID)},
    {   
        enabled: true,
        refetchOnWindowFocus: false
    }
    );

    // if (data) {
    //     console.log("data from profile pic", data);
    // }

    // let profilePicSrc = "/";
    // if (data) {
    //     //Create url from blob for img src={profilePic}
    //     profilePicSrc = window.URL.createObjectURL(data);
    // }
    
    return (
        <React.Fragment>
            <Image 
                className=" m-2"
                src={data ? data.file_url : "/"}
                width={props.width}
                height={props.height}
                alt="Profile picture"
            />
            {/* <Image 
                className=" m-2"
                src={`http://localhost:5000/media/users/00000000-0000-0000-0000-000000000000/profile-pic.webp`}
                width={props.width}
                height={props.height}
                alt="Profile picture"
            /> */}
        </React.Fragment>
    );
}

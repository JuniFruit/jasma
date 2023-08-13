import { useAuthStore } from "@/entities/auth";
import { ChangePasswordForm } from "@/features/auth/password";
import { UploadProfilePic } from "../upload-profile-pic/UploadProfilePic";
import Link from "next/link";
import { StreamActionBtn } from "@/entities/stream";

//import FileUploader from "../../file-upload/FileUploader";

//The Settings profile
export function Settings(props) {
    const { user } = useAuthStore();

    return (
        <>
            <h1 className="text-2xl text-center">Settings</h1>
            <UploadProfilePic userID={user?.id} />
            <ChangePasswordForm />
            <Link href={"/stream-page/settings"}>
                <StreamActionBtn>Streamer Settings</StreamActionBtn>
            </Link>
        </>
    );
}

/* ADD THIS CODE LATER (DO NOT DELETE) */

/*

            {isLoggedIn ? (
            <React.Fragment>
            <h1 className='text-2xl'>Settings</h1>

            <p>Your current profile picture: </p>
            <ProfilePic 
                userID={userID}
                width="250"
                height="250"
            />
            <p>Change profile picture:</p>
            {/* <FileUploader
                file={file}
                setFile={setFile}
            /> */ //}

/*

            <ChangePasswordForm />

            </React.Fragment>
            ) 
            : 
            <h2 className='text-2xl'>You need to login.</h2>}

*/

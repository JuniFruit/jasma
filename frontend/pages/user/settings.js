import { useCheckAuthClientSide } from "@/features/auth/admin";
import { MobileDetectSSR } from "@/shared/model";
import UserWidgets from "@/widgets/user";

//The Settings profile
export default function Settings(props) {
    //Redirect user to the login page if they are not logged in.
    useCheckAuthClientSide("/login");

    return (
        <div className="flex flex-col items-center">
            <UserWidgets.Settings />
        </div>
    );
}

export const getServerSideProps = async (ctx) => {
    const { isMobile } = MobileDetectSSR(ctx);
    return {
        props: { isSSRMobile: isMobile }
    };
};

import {ProfileImage} from "../profile/ProfileImage";


export default function Sidebar() {
    return (
        <div className={"h-full flex items-center justify-center"}>
            <ProfileImage/>
        </div>
    );
}
import logo from '../assets/profilefoto.jpg';

export const ProfileImage = () => {
    return <>
        <div className={"flex items-center justify-center mt-36 flex-col"}>
            <img className={"rounded-3xl w-96 h-96 mt-16"} src={logo} alt={"profile"}/>
        </div>
    </>
}
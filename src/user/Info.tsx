import {useEffect, useState} from "react";
import InfoTab, {TUserInfo} from "./InfoTab";

export default function Info() {
    const [user, setUser] = useState<TUserInfo[]>([]);

    useEffect(() => {
        const callApi = async () => {
            let response: TUserInfo[] = await (await fetch(`${import.meta.env.VITE_REQUEST_URL}/users`)).json();
            setUser(response);
        }
        callApi();
    }, [])

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Interesse geweckt?</p>
            <span className={"w-96 h-auto mt-8"}>
                Hello! I am an Android and Data engineer based in Paris France. The guiding quasar of my journey is working on solutions that leverage best-practice technologies to deliver a top user experience. I love all things android.
            </span>
            <div className={"flex flex-wrap justify-start mt-16"}>{user.map(exp => <InfoTab {...exp}/>)}</div>
            <p className={"bg-green-500 w-auto h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold hover:text-white cursor-pointer mt-10"}>Lebenslauf
                herunterladen</p>
        </div>
    );
}
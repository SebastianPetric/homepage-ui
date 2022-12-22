import {useEffect, useState} from "react";
import InfoTab, {TUserInfo} from "./InfoTab";
import pdf from '../assets/Bewerbung.pdf';

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
                Hab' ich Dein Interesse geweckt? Dann melde Dich doch einfach bei mir! Oder lade Dir meinen Lebenslauf herunter.
            </span>
            <div className={"flex flex-wrap justify-start mt-8"}>{user.map(exp => <InfoTab {...exp}/>)}</div>
            <a href={pdf} target="_blank" className={"bg-green-500 w-auto h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold hover:text-white cursor-pointer mt-10"}>Lebenslauf
                herunterladen</a>
        </div>
    );
}
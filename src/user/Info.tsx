import {useEffect, useState} from "react";
import InfoTab, {TUserInfo} from "./InfoTab";
import EditableText from "../shared/EditableText";

export default function Info() {
    const [user, setUser] = useState<TUserInfo[]>([]);
    const [text, setText] = useState<string>("Hab' ich Dein Interesse geweckt? Dann melde Dich doch einfach bei mir! Oder lade Dir meinen Lebenslauf herunter.");
    const [isEditVisible, setIsEditVisible] = useState<boolean>(true);

    useEffect(() => {
        const callApi = async () => {
            let response: TUserInfo[] = await (await fetch(`${import.meta.env.VITE_REQUEST_URL}/users`)).json();
            setUser(response);
        }
        callApi();
    }, []);

    const onSaveText = (curText: string) => {
        setText(curText);
        //TODO server call
    }

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Interesse geweckt?</p>
            <span className={"w-96 h-auto mt-8"}>
                <EditableText isEditVisible={isEditVisible} txt={text} onSave={onSaveText}/>
            </span>
            <div className={"flex flex-wrap justify-start mt-8"}>{user.map((exp: TUserInfo, index: number) => <InfoTab
                key={`${exp.id}-${index}`} {...exp}/>)}</div>
            <a href={""} target="_blank"
               className={"bg-green-500 w-auto h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold hover:text-white cursor-pointer mt-10"}>Lebenslauf
                herunterladen</a>
        </div>
    );
}
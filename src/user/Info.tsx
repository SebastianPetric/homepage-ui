import {useEffect, useState} from "react";
import InfoTab, {TUserInfo} from "./InfoTab";
import {findAllEntities, findTextByType, updateEntity} from "../shared/RestCaller";
import EditTextModal, {TextType, TText, TTextDTO} from "../shared/EditTextModal";

export default function Info({isEditActive}: { isEditActive: boolean }) {
    const [user, setUser] = useState<TUserInfo[]>([]);
    const [textObj, setTextObj] = useState<TText>({id: "", text: "", type: ""});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const COVERING_ENDPOINT = "covering-letter"

    useEffect(() => {
        const getAllInfo = async () => {
            let response: TUserInfo[] = await findAllEntities("users")
            setUser(response);
        }
        getAllInfo();

        const getCoveringLetter = async () => {
            let response: TText = await findTextByType(TextType.INFO);
            setTextObj(response);
            setIsLoaded(true);
        }
        getCoveringLetter();
    }, []);

    const onSaveText = async (cur: TText) => {
        const textDt: TTextDTO = {
            text: cur.text,
            type: cur.type
        }

        const saved: TText = await updateEntity(COVERING_ENDPOINT, cur.id, JSON.stringify(textDt));
        setTextObj(saved);
    }

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Interesse geweckt?</p>
            <span className={"w-96 h-auto mt-8"}>
                {isLoaded && isEditActive &&
                  <EditTextModal titleModal={"Bearbeiten"} onSaveText={onSaveText} editTextObj={textObj}/>}
                <p dangerouslySetInnerHTML={{__html: textObj.text}}></p>
            </span>
            <div className={"flex flex-wrap justify-start mt-8"}>{user.map((exp: TUserInfo, index: number) => <InfoTab
                key={`${exp.id}-${index}`} {...exp}/>)}</div>
            <a href={""} target="_blank"
               className={"bg-green-500 w-auto h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold hover:text-white cursor-pointer mt-10"}>Lebenslauf
                herunterladen</a>
        </div>
    );
}
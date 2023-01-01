import {useEffect, useState} from "react";
import EditTextModal, {TextType, TText, TTextDTO} from "../shared/EditTextModal";
import {findTextByType, updateEntity} from "../shared/RestCaller";

export default function Greeting({isEditActive}: { isEditActive: boolean }) {
    const [textObj, setTextObj] = useState<TText>({id: "", text: "", type: ""});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const COVERING_ENDPOINT = "covering-letter"

    useEffect(() => {
        const getCoveringLetter = async () => {
            let response: TText = await findTextByType(TextType.COVERING);
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
            <p className={"text-5xl font-bold"}>Sebastian Petöcz.</p>
            <span className={"w-96 h-auto mt-8"}>
           {isLoaded && isEditActive &&
             <EditTextModal titleModal={"Bearbeiten"} onSaveText={onSaveText} editTextObj={textObj}/>}
                <p dangerouslySetInnerHTML={{__html: textObj.text}}></p>
        </span>
        </div>
    );
}
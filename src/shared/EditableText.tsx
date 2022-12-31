import {useState} from "react";
import {FaPencilAlt, FaSave} from "react-icons/all";

export default function EditableText({
                                         txt,
                                         onSave,
                                         isEditVisible
                                     }: { txt: string, isEditVisible: boolean, onSave: (cur: string) => void }) {

    const [shouldEdit, setShouldEdit] = useState<boolean>(false);
    const [text, setText] = useState<string>(txt);

    const save = (cur: string) => {
        setText(cur);
        onSave(text);
        setShouldEdit(false);
    };

    return (
        <>
            <div className={"flex flex-row"}>
                {shouldEdit && isEditVisible &&
                  <FaSave className={"hover:text-green-600 cursor-pointer"} onClick={() => save(text)}/>}
                {!shouldEdit && isEditVisible &&
                  <FaPencilAlt className={"text-sm hover:text-green-600 cursor-pointer"}
                               onClick={() => setShouldEdit(true)}/>}
            </div>

            {shouldEdit && isEditVisible ?
                <div contentEditable={true} className={"border-2 w-full"}
                     onChange={(e) => save(e.currentTarget.innerHTML)} dangerouslySetInnerHTML={{__html: text}}/> :
                <div className={"w-96 h-auto mt-2"} dangerouslySetInnerHTML={{__html: text}}/>}
        </>
    );
}
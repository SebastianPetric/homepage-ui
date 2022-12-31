import {FaCheck, FaEdit, FaMinus, FaTimes} from "react-icons/all";
import {useState} from "react";

export type TEditableTextFieldType = {
    value: string,

    onSaveItem: (oldItm: string, curItm: string) => void;

    onDeleteItem: (curItm: string) => void,

    isEditVisible: boolean
}


export default function EditableTextField(props: TEditableTextFieldType) {
    const [shouldEdit, setShouldEdit] = useState<boolean>(false);
    const [text, setText] = useState<string>(props.value);


    const onCancel = () => {
        setText(props.value);
        setShouldEdit(false);
    }

    const onDelete = (curItm: string) => {
        props.onDeleteItem(curItm);
    }

    const onSave = (oldItm: string, curItm: string) => {
        if (text === '')
            props.onDeleteItem(props.value);
        else {
            props.onSaveItem(oldItm, curItm);
            setShouldEdit(false);
        }
    }

    return (
        <div className={"flex flex-row items-center"}>
          <span>
              {shouldEdit && props.isEditVisible ?
                  <div contentEditable={true} className={"border-2 w-full h-auto font-bold"}
                       onChange={(e) => setText(e.currentTarget.innerHTML)}>{text}</div> :
                  <p>{text}</p>}
          </span>
            {shouldEdit && props.isEditVisible &&
              <FaCheck className={"ml-2 text-sm hover:text-green-600 cursor-pointer"}
                       onClick={() => onSave(props.value, text)}/>}
            {!shouldEdit && props.isEditVisible &&
              <FaEdit className={"ml-2 text-sm hover:text-green-600 cursor-pointer"} onClick={(e => {
                  setShouldEdit(true);
              })}/>}
            {!shouldEdit && props.isEditVisible &&
              <FaMinus className={"ml-2 text-sm hover:text-green-600 cursor-pointer"}
                       onClick={() => onDelete(props.value)}/>}
            {shouldEdit && props.isEditVisible &&
              <FaTimes className={"ml-2 text-sm hover:text-green-600 cursor-pointer"} onClick={() => onCancel()}/>}
        </div>
    );
}
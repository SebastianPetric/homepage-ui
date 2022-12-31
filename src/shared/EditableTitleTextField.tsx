import {FaEdit, FaMinus, FaPlus, FaSave, FaTimes} from "react-icons/all";
import {useEffect, useState} from "react";

export default function EditableTitleTextField({
                                                   hasBeenEdited,
                                                   oldTitle,
                                                   id,
                                                   saveTile,
                                                   editTitle,
                                                   deleteTile,
                                                   addItem,
                                                   isEditVisible
                                               }: { oldTitle: string, id: string, hasBeenEdited: boolean, editTitle: (cur: string) => void, isEditVisible: boolean, saveTile: (cur: string) => void, deleteTile: (id: string) => void, addItem: (cur: string) => void }) {

    const [hasTitleChanged, setHasTitleChanged] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(oldTitle);
    const [shouldEdit, setShouldEdit] = useState<boolean>(false);

    useEffect(() => {
        if (isEditVisible && title !== oldTitle) {
            setShouldEdit(true);
            setHasTitleChanged(true);
        } else {
            setShouldEdit(false);
            setHasTitleChanged(false);
        }

    }, [title])


    const onSave = (cur: string) => {
        if (oldTitle !== cur)
            setHasTitleChanged(true)
        setShouldEdit(false);
        editTitle(cur);
        saveTile(cur);
    }

    const handleChange = (cur: string) => {
        if (oldTitle !== cur)
            setHasTitleChanged(true);
        else
            setHasTitleChanged(true);
        setTitle(cur);
    }

    const edit = () => {
        setShouldEdit(true);
    }

    const onCancel = () => {
        setTitle(oldTitle);
        setShouldEdit(false);
    }


    return <div className={"flex flex-col justify-start items-start"}>
        <div className={"flex flex-row"}>
            {(hasBeenEdited || hasTitleChanged) && isEditVisible &&
              <FaSave className={"mb-2 mr-2 hover:text-green-600 cursor-pointer"} onClick={() => onSave(title)}/>}
            {!shouldEdit && isEditVisible &&
              <FaEdit className={"text-sm mb-2 mr-2 hover:text-green-600 cursor-pointer"} onClick={(() => {
                  setShouldEdit(true);
              })}/>}
            {shouldEdit && isEditVisible &&
              <FaTimes className={"mb-2 mr-2 hover:text-green-600 cursor-pointer"} onClick={() => onCancel()}/>}
            {isEditVisible && <><FaPlus className={" mr-2 mb-2hover:text-green-600 cursor-pointer"}
                                        onClick={() => addItem(`Neu-${Math.random() * 100}`)}/>
              <FaMinus className={"mb-2 mr-2  hover:text-green-600 cursor-pointer"}
                       onClick={() => deleteTile(id)}/></>}

        </div>
        <span>
              {(shouldEdit && isEditVisible) ?
                  <input maxLength={21} className={"border-2 w-full h-auto text-xl font-bold text-green-600"}
                         value={title}
                         onChange={(e) => handleChange(e.target.value)}/> :
                  <p className={"text-xl font-bold mb-2 text-green-600"}>{title}</p>}
          </span>


    </div>
}
import EditableTitleTextField from "./EditableTitleTextField";
import EditableTextField from "./EditableTextField";
import {useEffect, useState} from "react";
import arrayEquals from "../util/ArrayHelper";


export type TEditableTile = {
    oldTitle: string,
    items: string[],
    id: string,

    isEditVisible: boolean,
    saveTile: (id: string, cur: string, items: string[]) => void,
    deleteTile: (id: string) => void,
}
export default function EditableTile(tile: TEditableTile) {
    const [items, setItems] = useState<string[]>(tile.items);
    const [title, setTitle] = useState<string>(tile.oldTitle);
    const [hasBeenEdited, setHasBeenEdited] = useState<boolean>(false);

    useEffect(() => {
        if ((title !== tile.oldTitle || !arrayEquals(tile.items, items)) && tile.isEditVisible)
            setHasBeenEdited(true);
        else
            setHasBeenEdited(false);
    }, [items, tile]);


    const onSaveTile = (curTitle: string) => {
        if (curTitle !== tile.oldTitle) {
            setTitle(curTitle);
            tile.saveTile(tile.id, curTitle, items);
        }
        setHasBeenEdited(false);
    }

    const onSaveItem = (oldItem: string, curItem: string) => {
        let tmp = [...items];
        let idx = tmp.indexOf(oldItem)
        tmp[idx] = curItem;
        setItems(tmp);
        setHasBeenEdited(true);
    }

    const onAddItem = () => {
        let tmp = [...items, `neu-${Math.random() * 100}`];
        setItems(tmp);
        setHasBeenEdited(true);
    }

    const onDeleteItem = (itm: string) => {
        let tmp = items.filter(it => it !== itm);
        setItems(tmp);
        setHasBeenEdited(true);
    }


    return (
        <>
            <div className={"flex flex-col mr-10 mb-10 w-72"}>
                <EditableTitleTextField oldTitle={tile.oldTitle} id={tile.id} hasBeenEdited={hasBeenEdited}
                                        editTitle={() => setTitle} isEditVisible={tile.isEditVisible}
                                        saveTile={onSaveTile} deleteTile={tile.deleteTile} addItem={onAddItem}/>
                <ul>
                    {items.map((it, index) => <li key={`${it}-${index}`} className={"font-bold"}><EditableTextField
                        isEditVisible={tile.isEditVisible}
                        value={it}
                        onSaveItem={onSaveItem}
                        onDeleteItem={onDeleteItem}/>
                    </li>)}
                </ul>
            </div>

        </>
    );
}
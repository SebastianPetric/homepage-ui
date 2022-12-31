import {useState} from "react";
import EditableText from "../shared/EditableText";

export default function Greeting({isEditActive}: { isEditActive: boolean }) {
    const [text, setText] = useState<string>("Hey! Ich bin Fullstack Software Engineer wohnhaft in Freiburg. Wie Aristoteles einst sagte: <br/><br/> <b>\"Das Ganze ist mehr als die Summe seiner Teile\".</b><br/><br/> Wenn das Frontend das Aussehen ist, so ist das Backend die Seele. Ich liebe es beides miteinander zu einem großen Ganzen zu vereinen.");

    const onSaveText = (cur: string) => {
        setText(cur);
    }

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Sebastian Petöcz.</p>
            <span className={"w-96 h-auto mt-8"}>
                <EditableText isEditVisible={isEditActive} txt={text} onSave={onSaveText}/>
            </span>
        </div>
    );
}
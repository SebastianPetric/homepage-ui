import {useEffect, useState} from "react";
import EditableTile from "../shared/EditableTile";
import EditableText from "../shared/EditableText";

export type TExperience = {
    id: string,
    title: string,
    experiencePoints: string[]
}

export default function AboutMe() {

    const [experiences, setExperiences] = useState<TExperience[]>([]);
    const [text, setText] = useState<string>("Aktuell arbeite ich als Software Engineer bei der \<b\>Inxmail GmbH\<\/b\>. Mein erster Arbeitgeber nach meinem Studium in der Hochschule Furtwangen, wo ich sowohl meinen <b>Bachelor of Science</b>, als auch meinen <b>Master of Science</b> in <b>Medieninformatik</b> erhalten habe.")
    const [isEditVisible, setIsEditVisible] = useState<boolean>(true);

    useEffect(() => {
        const callApi = async () => {
            let response: TExperience[] = await (await fetch(`${import.meta.env.VITE_REQUEST_URL}/experiences`)).json();
            setExperiences(response);
        }
        callApi();
    }, []);

    const onDeleteTile = (id: string) => {
        let tmp = experiences.filter(ex => ex.id !== id);
        setExperiences(tmp);
        //TODO Server call
    }

    const onSaveTile = (id: string, curTitle: string, items: string[]) => {
        let tmp = [...experiences]
        let idx = tmp.findIndex(it => it.id === id);
        tmp[idx].title = curTitle;
        tmp[idx].experiencePoints = items;
        setExperiences(tmp);
        //TODO Server call
    }

    const onSaveText = (curText: string) => {
        setText(curText);
        //TODO server call
    }

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Über mich.</p>

            <span className={"w-96 h-auto mt-8"}>
                <EditableText isEditVisible={isEditVisible} txt={text} onSave={onSaveText}/>
            </span>
            <div className={"flex flex-wrap justify-start mt-16"}>
                {
                    experiences.map(exp => <EditableTile key={`${exp.id}`} isEditVisible={isEditVisible}
                                                         deleteTile={onDeleteTile} id={exp.id}
                                                         items={exp.experiencePoints} oldTitle={exp.title}
                                                         saveTile={onSaveTile}/>)
                }
            </div>

            <div>

            </div>
            <a href={""} target="_blank"
               className={"bg-green-500 w-auto h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold hover:text-white cursor-pointer mt-10"}>Erstellen</a>
        </div>
    );
}
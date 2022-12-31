import {useEffect, useState} from "react";
import EditableTile from "../shared/EditableTile";
import EditableText from "../shared/EditableText";
import NewExperienceModal from "./NewExperienceModal";
import {deleteEntity, findAllEntities, saveEntity} from "../shared/RestCaller";

export type TExperience = {
    id: string,
    title: string,
    experiencePoints: string[]
}

export type TExperienceDTO = {
    title: string,
    experiencePoints: string[]
}

export default function AboutMe({isEditActive}: { isEditActive: boolean }) {

    const [experiences, setExperiences] = useState<TExperience[]>([]);
    const [text, setText] = useState<string>("Aktuell arbeite ich als Software Engineer bei der \<b\>Inxmail GmbH\<\/b\>. Mein erster Arbeitgeber nach meinem Studium in der Hochschule Furtwangen, wo ich sowohl meinen <b>Bachelor of Science</b>, als auch meinen <b>Master of Science</b> in <b>Medieninformatik</b> erhalten habe.")
    const EXPERIENCE_ENDPOINT = "experiences";

    useEffect(() => {
        const callApi = async () => {
            let response: TExperience[] = await findAllEntities(EXPERIENCE_ENDPOINT);
            setExperiences(response);
        }
        callApi();
    }, []);


    const saveNewExperience = async (exp: TExperienceDTO) => {
        const newExp: TExperience = await saveEntity(EXPERIENCE_ENDPOINT, JSON.stringify({...exp}));
        setExperiences([...experiences, newExp]);
    }

    const onDeleteTile = async (id: string) => {
        let tmp = experiences.filter(ex => ex.id !== id);
        setExperiences(tmp);
        await deleteEntity(EXPERIENCE_ENDPOINT, id);
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
                <EditableText isEditVisible={isEditActive} txt={text} onSave={onSaveText}/>
            </span>
            <div className={"flex flex-wrap justify-start mt-16"}>
                {
                    experiences.map(exp => <EditableTile key={`${exp.id}`} isEditVisible={isEditActive}
                                                         deleteTile={onDeleteTile} id={exp.id}
                                                         items={exp.experiencePoints} oldTitle={exp.title}
                                                         saveTile={onSaveTile}/>)
                }
            </div>
            <NewExperienceModal isEditVisible={isEditActive} onSaveExp={saveNewExperience}/>
        </div>
    );
}
import {useEffect, useState} from "react";
import EditableTile from "../shared/EditableTile";
import NewExperienceModal from "./NewExperienceModal";
import {deleteEntity, findAllEntities, saveEntity, updateEntity} from "../shared/RestCaller";
import EditTextModal, {TextType, TText, TTextDTO} from "../shared/EditTextModal";

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
    const [textObj, setTextObj] = useState<TText>({id: "", text: "", type: ""});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const COVERING_ENDPOINT = "covering-letter"
    const EXPERIENCE_ENDPOINT = "experiences";

    useEffect(() => {
        const getAllExperiences = async () => {
            let response: TExperience[] = await findAllEntities(EXPERIENCE_ENDPOINT);
            setExperiences(response);
        }
        getAllExperiences();

        const getCoveringLetter = async () => {
            let response: TText[] = await findAllEntities(COVERING_ENDPOINT);

            setTextObj(response.filter(it => it.type === TextType.ABOUT_ME)[0]);
            setIsLoaded(true);
        }
        getCoveringLetter();

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
            <p className={"text-5xl font-bold"}>Über mich.</p>

            <span className={"w-96 h-auto mt-8"}>
                {isLoaded && isEditActive &&
                  <EditTextModal titleModal={"Bearbeiten"} onSaveText={onSaveText} editTextObj={textObj}/>}
                <p dangerouslySetInnerHTML={{__html: textObj.text}}></p>
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
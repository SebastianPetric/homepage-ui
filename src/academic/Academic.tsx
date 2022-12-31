import {useEffect, useState} from "react";
import AcademicTab, {TAcademic, TAcademicDTO} from "./AcademicTab";
import EditableText from "../shared/EditableText";
import NewStepModal, {DTO} from "../shared/NewStepModal";
import {deleteEntity, findAllEntities, updateEntity} from "../shared/RestCaller";
import {GENERIC_DAO} from "../shared/EditStepModal";

export default function Academic({isEditActive}: { isEditActive: boolean }) {

    const [academic, setAcademic] = useState<TAcademic[]>([]);
    const [text, setText] = useState<string>("<b>\"Furtwangen ist das, was du drauß machst.\"</b> Wie wahr dieser Satz doch ist. Hier wurden sowohl Freunde fürs Leben gefunden, als auch die Basis für meine berufliche Laufbahn gelegt.");
    const ACADEMIC_ENDPOINT = "academic";

    useEffect(() => {
        const callApi = async () => {
            let response: TAcademic[] = await findAllEntities(ACADEMIC_ENDPOINT)
            setAcademic(response);
        }
        callApi();
    }, []);

    const onSaveText = (cur: string) => {
        setText(cur);
    }

    const onSaveAcademic = (academic: DTO) => {
        let newObj: TAcademicDTO = {
            title: academic.title,
            school: academic.institution,
            from_date: academic.from_date,
            to_date: academic.to_date,
            focusList: academic.points
        }
        //TODO server call
    }

    const onSaveEditedAcademic = async (ac: GENERIC_DAO) => {

        const careerDt: TAcademicDTO = {
            title: ac.title,
            school: ac.institution,
            from_date: ac.from_date,
            to_date: ac.to_date,
            focusList: ac.points
        }

        const saved: TAcademic = await updateEntity(ACADEMIC_ENDPOINT, ac.id, JSON.stringify(careerDt));
        let index: number = academic.findIndex(it => it.id === ac.id);
        let tmp = [...academic];
        tmp[index] = saved;
        setAcademic(tmp);
    }


    const onDeleteAcademic = async (id: string) => {
        await deleteEntity(ACADEMIC_ENDPOINT, id);
        let tmp = [...academic];
        tmp = tmp.filter(it => it.id !== id);
        setAcademic(tmp);
    }

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Akademischer Werdegang.</p>
            <span className={"w-96 h-auto mt-8"}>
                <EditableText isEditVisible={isEditActive} txt={text} onSave={onSaveText}/>
            </span>
            <div className={"flex flex-wrap justify-start mt-8"}>{academic.map((exp, index) => <AcademicTab
                key={`${exp.title}-${index}`} academic={{...exp}} onDelete={onDeleteAcademic}
                onSaveEditedCareer={onSaveEditedAcademic} isEditVisible={isEditActive}/>)}</div>
            <NewStepModal isEditVisible={isEditActive} onSaveExp={onSaveAcademic}
                          titleModal={"Schulischer hinzufügen"}/>
        </div>
    );
}
import {useEffect, useState} from "react";
import AcademicTab, {TAcademic, TAcademicDTO} from "./AcademicTab";
import EditableText from "../shared/EditableText";
import NewStepModal, {DTO} from "../shared/NewStepModal";

export default function Academic() {

    const [academic, setAcademic] = useState<TAcademic[]>([]);
    const [text, setText] = useState<string>("<b>\"Furtwangen ist das, was du drauß machst.\"</b> Wie wahr dieser Satz doch ist. Hier wurden sowohl Freunde fürs Leben gefunden, als auch die Basis für meine berufliche Laufbahn gelegt.");
    const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

    useEffect(() => {
        const callApi = async () => {
            let response: TAcademic[] = await (await fetch(`${import.meta.env.VITE_REQUEST_URL}/academic`)).json();
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

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Akademischer Werdegang.</p>
            <span className={"w-96 h-auto mt-8"}>
                <EditableText isEditVisible={isEditVisible} txt={text} onSave={onSaveText}/>
            </span>
            <div className={"flex flex-wrap justify-start mt-8"}>{academic.map((exp, index) => <AcademicTab
                key={`${exp.title}-${index}`} {...exp}/>)}</div>
            <NewStepModal isEditVisible={isEditVisible} onSaveExp={onSaveAcademic} titleModal={"Schulischer hinzufügen"}/>
        </div>
    );
}
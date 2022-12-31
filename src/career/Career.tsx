import {useEffect, useState} from "react";
import CareerTab, {TCareer, TCareerDTO} from "./CareerTab";
import EditableText from "../shared/EditableText";
import NewStepModal, {DTO} from "../shared/NewStepModal";

export default function Career() {
    const [career, setCareer] = useState<TCareer[]>([]);
    const [text, setText] = useState<string>("Ja, Du siehst richtig. Meinen Zivildienst habe ich im Krankenhaus absolviert. Das liegt an meinem ursprünglichen Wunsch Medizin zu studieren. Dieser ist jedoch nach dem Zivildienst dem Wunsch <b>Software Entwickler</b> zu werden, gewichen.");
    const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

    useEffect(() => {
        const callApi = async () => {
            let response: TCareer[] = await (await fetch(`${import.meta.env.VITE_REQUEST_URL}/career`)).json();
            setCareer(response);
        }
        callApi();
    }, []);

    const onSaveText = (curText: string) => {
        setText(curText);
        //TODO server call
    }

    const onSaveCareer = (career: DTO) => {
        let newObj: TCareerDTO = {
            title: career.title,
            company: career.institution,
            from_date: career.from_date,
            to_date: career.to_date,
            toDos: career.points
        }

        //TODO server call
    }

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Beruflicher Werdegang.</p>
            <span className={"w-96 h-auto mt-8"}>
                <EditableText isEditVisible={isEditVisible} txt={text} onSave={onSaveText}/>
            </span>
            <div className={"flex flex-wrap justify-start mt-8"}>
                {career.map((exp, index) => <CareerTab key={`${exp.id}-${index}`} {...exp}/>)}
            </div>
            <NewStepModal isEditVisible={isEditVisible} onSaveExp={onSaveCareer} titleModal={"Karriereschritt hinzufügen"}/>
        </div>
    );
}
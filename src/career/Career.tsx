import {useEffect, useState} from "react";
import CareerTab, {TCareer, TCareerDTO} from "./CareerTab";
import NewStepModal, {DTO} from "../shared/NewStepModal";
import {deleteEntity, findAllEntities, findTextByType, saveEntity, updateEntity} from "../shared/RestCaller";
import {GENERIC_DAO} from "../shared/EditStepModal";
import EditTextModal, {TextType, TText, TTextDTO} from "../shared/EditTextModal";

export default function Career({isEditActive}: { isEditActive: boolean }) {
    const [career, setCareer] = useState<TCareer[]>([]);
    const [textObj, setTextObj] = useState<TText>({id: "", text: "", type: ""});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const COVERING_ENDPOINT = "covering-letter"
    const CAREER_ENDPOINT = "career";

    useEffect(() => {
        const getAllCareer = async () => {
            let response: TCareer[] = await findAllEntities(CAREER_ENDPOINT);
            setCareer(response);
        }
        getAllCareer();

        const getCoveringLetter = async () => {
            let response: TText = await findTextByType(TextType.CAREER);
            setTextObj(response);
            setIsLoaded(true);
        }
        getCoveringLetter();
    }, []);

    const onSaveText = async (cur: TText) => {
        const textDt: TTextDTO = {
            text: cur.text,
            type: cur.type
        }

        const saved: TText = await updateEntity(COVERING_ENDPOINT, cur.id, JSON.stringify(textDt));
        setTextObj(saved);
    }

    const onSaveCareer = async (car: DTO) => {
        let newObj: TCareerDTO = {
            title: car.title,
            company: car.institution,
            from_date: car.from_date,
            to_date: car.to_date,
            toDos: car.points
        }
        const saved: TCareer = await saveEntity(CAREER_ENDPOINT, JSON.stringify(newObj));
        setCareer([...career, saved]);
    }

    const onSaveEditedCareer = async (car: GENERIC_DAO) => {

        const careerDt: TCareerDTO = {
            title: car.title,
            company: car.institution,
            from_date: car.from_date,
            to_date: car.to_date,
            toDos: car.points
        }

        const saved: TCareer = await updateEntity(CAREER_ENDPOINT, car.id, JSON.stringify(careerDt));
        let index: number = career.findIndex(it => it.id === car.id);
        let tmp = [...career];
        tmp[index] = saved;
        setCareer(tmp);
    }

    const onDeleteCareer = async (id: string) => {
        await deleteEntity(CAREER_ENDPOINT, id);
        let tmp = [...career];
        tmp = tmp.filter(it => it.id !== id);
        setCareer(tmp);
    }

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Beruflicher Werdegang.</p>
            <span className={"w-96 h-auto mt-8"}>
                 {isLoaded && isEditActive &&
                   <EditTextModal onSaveText={onSaveText} editTextObj={textObj}/>}
                <p dangerouslySetInnerHTML={{__html: textObj.text}}></p>
            </span>
            <div className={"flex flex-wrap justify-start mt-8"}>
                {career.map((exp, index) => <CareerTab key={`${exp.id}-${index}`} isEditVisible={isEditActive}
                                                       career={{...exp}}
                                                       onDelete={onDeleteCareer}
                                                       onSaveEditedCareer={onSaveEditedCareer}/>)}
            </div>
            <NewStepModal isEditVisible={isEditActive} onSaveExp={onSaveCareer}
                          titleModal={"Karriereschritt hinzufügen"}/>
        </div>
    );
}
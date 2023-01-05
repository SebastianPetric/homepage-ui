import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CareerTab, { TCareer, TCareerDTO } from "./CareerTab";
import {
  deleteEntity,
  findAllEntities,
  findTextByType,
  saveEntity,
  updateEntity,
} from "../shared/RestCaller";
import CreateAndEditAcademicCareerStepModal, {
  GENERIC_DAO,
  GENERIC_DTO,
} from "../shared/modals/CreateAndEditAcademicCareerStepModal";
import EditDescriptionTextModal, {
  TextType,
  TText,
} from "../shared/description/EditDescriptionTextModal";
import DescriptionText, {
  onSaveDescriptionText,
} from "../shared/description/DescriptionText";
import { ENDPOINT } from "../App";

export default function Career({ isEditActive }: { isEditActive: boolean }) {
  const [career, setCareer] = useState<TCareer[]>([]);
  const [textObj, setTextObj] = useState<TText>({ id: "", text: "", type: "" });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    const getAllCareer = async () => {
      let response: TCareer[] = await findAllEntities(
        ENDPOINT.CAREER.valueOf()
      );
      setCareer(response);
    };

    const getCoveringLetter = async () => {
      let response: TText = await findTextByType(TextType.CAREER);
      setTextObj(response);
      setIsLoaded(true);
    };

    if (!!inView) {
      getAllCareer();
      getCoveringLetter();
    }
  }, [inView]);

  const onSaveText = async (cur: TText) => {
    await onSaveDescriptionText(
      cur,
      ENDPOINT.COVERING_LETTER.valueOf(),
      setTextObj
    );
  };

  const onSaveCareer = async (car: GENERIC_DTO) => {
    let newObj: TCareerDTO = {
      title: car.title,
      company: car.institution,
      from_date: car.from_date,
      to_date: car.to_date,
      toDos: car.points,
    };
    const saved: TCareer = await saveEntity(
      ENDPOINT.CAREER.valueOf(),
      JSON.stringify(newObj)
    );
    setCareer([...career, saved]);
  };

  const onSaveEditedCareer = async (car: GENERIC_DAO) => {
    const careerDt: TCareerDTO = {
      title: car.title,
      company: car.institution,
      from_date: car.from_date,
      to_date: car.to_date,
      toDos: car.points,
    };

    const saved: TCareer = await updateEntity(
      ENDPOINT.CAREER.valueOf(),
      car.id,
      JSON.stringify(careerDt)
    );
    let index: number = career.findIndex((it) => it.id === car.id);
    let tmp = [...career];
    tmp[index] = saved;
    setCareer(tmp);
  };

  const onDeleteCareer = async (id: string) => {
    await deleteEntity(ENDPOINT.CAREER.valueOf(), id);
    let tmp = [...career];
    tmp = tmp.filter((it) => it.id !== id);
    setCareer(tmp);
  };

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"title"}>Beruflicher Werdegang.</p>
      <div className={"mt-8"}>
        {isLoaded && (
          <EditDescriptionTextModal
            onSaveText={onSaveText}
            editTextObj={textObj}
            isEditActive={isEditActive}
          />
        )}
      </div>
      <DescriptionText text={textObj.text} />
      <div className={"tile-group"}>
        {career.map((exp, index) => (
          <CareerTab
            key={`${exp.id}-${index}`}
            isEditVisible={isEditActive}
            career={{ ...exp }}
            onDelete={onDeleteCareer}
            onSaveEditedCareer={onSaveEditedCareer}
          />
        ))}
      </div>
      <CreateAndEditAcademicCareerStepModal
        isEditVisible={isEditActive}
        onSaveExp={onSaveCareer}
        titleModal={"Karriereschritt hinzufügen"}
      />
    </div>
  );
}

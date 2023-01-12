import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CareerTab, { TCareer, TCareerDTO } from "./CareerTab";
import {
  deleteEntity,
  findAllEntities,
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
import DescriptionText from "../shared/description/DescriptionText";
import { ENDPOINT } from "../App";
import {
  getDescriptionByType,
  getStateByType,
} from "../covering-letter/DescriptionTextSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export default function Career() {
  const [career, setCareer] = useState<TCareer[]>([]);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const dispatch = useAppDispatch();

  const description: TText = useAppSelector((state) =>
    getStateByType(state, TextType.CAREER)
  );

  useEffect(() => {
    const getAllCareer = async () => {
      let response: TCareer[] = await findAllEntities(
        ENDPOINT.CAREER.valueOf()
      );
      setCareer(response);
    };

    if (!!inView) {
      getAllCareer();
      dispatch(getDescriptionByType(TextType.CAREER));
    }
  }, [inView]);

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
        <EditDescriptionTextModal type={TextType.CAREER} />
      </div>
      <DescriptionText description={description} />
      <div className={"tile-group"}>
        {career.map((exp, index) => (
          <CareerTab
            key={`${exp.id}-${index}`}
            career={{ ...exp }}
            onDelete={onDeleteCareer}
            onSaveEditedCareer={onSaveEditedCareer}
          />
        ))}
      </div>
      <CreateAndEditAcademicCareerStepModal
        onSaveExp={onSaveCareer}
        titleModal={"Karriereschritt hinzufügen"}
      />
    </div>
  );
}

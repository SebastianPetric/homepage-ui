import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AcademicTab, { TAcademic, TAcademicDTO } from "./AcademicTab";
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

export default function Academic() {
  const [academic, setAcademic] = useState<TAcademic[]>([]);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const dispatch = useAppDispatch();

  const description: TText = useAppSelector((state) =>
    getStateByType(state, TextType.ACADEMIC)
  );

  useEffect(() => {
    const getAllAcademics = async () => {
      let response: TAcademic[] = await findAllEntities(
        ENDPOINT.ACADEMIC.valueOf()
      );
      setAcademic(response);
    };

    if (!!inView) {
      getAllAcademics();
      dispatch(getDescriptionByType(TextType.ACADEMIC));
    }
  }, [inView]);

  const onSaveAcademic = async (ac: GENERIC_DTO) => {
    let newObj: TAcademicDTO = {
      title: ac.title,
      school: ac.institution,
      from_date: ac.from_date,
      to_date: ac.to_date,
      focusList: ac.points,
    };
    const saved: TAcademic = await saveEntity(
      ENDPOINT.ACADEMIC.valueOf(),
      JSON.stringify(newObj)
    );
    setAcademic([...academic, saved]);
  };

  const onSaveEditedAcademic = async (ac: GENERIC_DAO) => {
    const careerDt: TAcademicDTO = {
      title: ac.title,
      school: ac.institution,
      from_date: ac.from_date,
      to_date: ac.to_date,
      focusList: ac.points,
    };

    const saved: TAcademic = await updateEntity(
      ENDPOINT.ACADEMIC.valueOf(),
      ac.id,
      JSON.stringify(careerDt)
    );
    let index: number = academic.findIndex((it) => it.id === ac.id);
    let tmp = [...academic];
    tmp[index] = saved;
    setAcademic(tmp);
  };

  const onDeleteAcademic = async (id: string) => {
    await deleteEntity(ENDPOINT.ACADEMIC.valueOf(), id);
    let tmp = [...academic];
    tmp = tmp.filter((it) => it.id !== id);
    setAcademic(tmp);
  };

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"title"}>Akademischer Werdegang.</p>
      <div className={"mt-8"}>
        <EditDescriptionTextModal type={TextType.ACADEMIC} />
      </div>
      <DescriptionText description={description} />
      <div className={"tile-group"}>
        {academic.map((exp, index) => (
          <AcademicTab
            key={`${exp.title}-${index}`}
            academic={{ ...exp }}
            onDelete={onDeleteAcademic}
            onSaveEditedCareer={onSaveEditedAcademic}
          />
        ))}
      </div>
      <CreateAndEditAcademicCareerStepModal
        onSaveExp={onSaveAcademic}
        titleModal={"Akademischer Werdegangspunkt hinzufügen"}
      />
    </div>
  );
}

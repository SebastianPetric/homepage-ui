import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AcademicTab, { TAcademic, TAcademicDTO } from "./AcademicTab";
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

export default function Academic({ isEditActive }: { isEditActive: boolean }) {
  const [academic, setAcademic] = useState<TAcademic[]>([]);
  const [textObj, setTextObj] = useState<TText>({ id: "", text: "", type: "" });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    const getAllAcademics = async () => {
      let response: TAcademic[] = await findAllEntities(
        ENDPOINT.ACADEMIC.valueOf()
      );
      setAcademic(response);
    };

    const getCoveringLetter = async () => {
      let response: TText = await findTextByType(TextType.ACADEMIC);
      setTextObj(response);
      setIsLoaded(true);
    };

    if (!!inView) {
      getAllAcademics();
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
        {academic.map((exp, index) => (
          <AcademicTab
            key={`${exp.title}-${index}`}
            academic={{ ...exp }}
            onDelete={onDeleteAcademic}
            onSaveEditedCareer={onSaveEditedAcademic}
            isEditVisible={isEditActive}
          />
        ))}
      </div>
      <CreateAndEditAcademicCareerStepModal
        isEditVisible={isEditActive}
        onSaveExp={onSaveAcademic}
        titleModal={"Akademischer Werdegangspunkt hinzufügen"}
      />
    </div>
  );
}

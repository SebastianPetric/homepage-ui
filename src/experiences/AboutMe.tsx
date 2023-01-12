import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  deleteEntity,
  findAllEntities,
  findTextByType,
  saveEntity,
  updateEntity,
} from "../shared/RestCaller";
import EditDescriptionTextModal, {
  TextType,
  TText,
} from "../shared/description/EditDescriptionTextModal";
import ExperienceTab from "./ExperienceTab";
import DescriptionText, {
  onSaveDescriptionText,
} from "../shared/description/DescriptionText";
import CreateAndEditExperienceModal from "./CreateAndEditExperienceModal";
import { ENDPOINT } from "../App";

export type TExperience = {
  id: string;
  title: string;
  experiencePoints: string[];
};

export type TExperienceDTO = {
  title: string;
  experiencePoints: string[];
};

export default function AboutMe() {
  const [experiences, setExperiences] = useState<TExperience[]>([]);
  const [textObj, setTextObj] = useState<TText>({ id: "", text: "", type: "" });
  const [isLoadedCovering, setIsLoadedCovering] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    const getAllExperiences = async () => {
      let response: TExperience[] = await findAllEntities(
        ENDPOINT.EXPERIENCES.valueOf()
      );
      setExperiences(response);
    };

    const getCoveringLetter = async () => {
      let response: TText = await findTextByType(TextType.ABOUT_ME);
      setTextObj(response);
      setIsLoadedCovering(true);
    };

    if (!!inView) {
      getAllExperiences();
      getCoveringLetter();
    }
  }, [inView]);

  const saveNewExperience = async (exp: TExperienceDTO) => {
    const experienceDTO: TExperienceDTO = {
      title: exp.title,
      experiencePoints: exp.experiencePoints,
    };

    const saved: TExperience = await saveEntity(
      ENDPOINT.EXPERIENCES.valueOf(),
      JSON.stringify(experienceDTO)
    );
    setExperiences([...experiences, saved]);
  };

  const saveEditedExperience = async (exp: TExperience) => {
    const experienceDTO: TExperienceDTO = {
      title: exp.title,
      experiencePoints: exp.experiencePoints,
    };

    const saved: TExperience = await updateEntity(
      ENDPOINT.EXPERIENCES.valueOf(),
      exp.id,
      JSON.stringify(experienceDTO)
    );
    const index = experiences.findIndex((it) => it.id == exp.id);
    let tmp = [...experiences];
    tmp[index] = saved;
    setExperiences(tmp);
  };

  const onSaveText = async (cur: TText) => {
    await onSaveDescriptionText(cur, ENDPOINT.CAREER.valueOf(), setTextObj);
  };

  const onDeleteExperienceById = async (id: string) => {
    await deleteEntity(ENDPOINT.EXPERIENCES.valueOf(), id);
    const tmp = experiences.filter((it) => it.id !== id);
    setExperiences(tmp);
  };

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"title"}>Über mich.</p>

      <div className={"mt-8"}>
        {isLoadedCovering && (
          <EditDescriptionTextModal
            onSaveText={onSaveText}
            editTextObj={textObj}
          />
        )}
      </div>
      <DescriptionText text={textObj.text} />
      <div className={"tile-group"}>
        {experiences.map((exp, index) => (
          <ExperienceTab
            key={`${exp.id}-${index}`}
            exp={exp}
            onSaveEdit={saveEditedExperience}
            onDelete={onDeleteExperienceById}
          />
        ))}
      </div>
      <CreateAndEditExperienceModal onSaveExp={saveNewExperience} />
    </div>
  );
}

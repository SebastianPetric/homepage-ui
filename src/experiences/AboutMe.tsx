import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import NewExperienceModal from "./NewExperienceModal";
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

export type TExperience = {
  id: string;
  title: string;
  experiencePoints: string[];
};

export type TExperienceDTO = {
  title: string;
  experiencePoints: string[];
};

export default function AboutMe({ isEditActive }: { isEditActive: boolean }) {
  const [experiences, setExperiences] = useState<TExperience[]>([]);
  const [textObj, setTextObj] = useState<TText>({ id: "", text: "", type: "" });
  const [isLoadedCovering, setIsLoadedCovering] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const EXPERIENCE_ENDPOINT = "experiences";

  useEffect(() => {
    const getAllExperiences = async () => {
      let response: TExperience[] = await findAllEntities(EXPERIENCE_ENDPOINT);
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
      EXPERIENCE_ENDPOINT,
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
      EXPERIENCE_ENDPOINT,
      exp.id,
      JSON.stringify(experienceDTO)
    );
    const index = experiences.findIndex((it) => it.id == exp.id);
    let tmp = [...experiences];
    tmp[index] = saved;
    setExperiences(tmp);
  };

  const onSaveText = async (cur: TText) => {
    await onSaveDescriptionText(cur, EXPERIENCE_ENDPOINT, setTextObj);
  };

  const onDeleteExperienceById = async (id: string) => {
    await deleteEntity(EXPERIENCE_ENDPOINT, id);
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
            isEditActive={isEditActive}
          />
        )}
      </div>
      <DescriptionText text={textObj.text} />
      <div className={"tile-group"}>
        {experiences.map((exp, index) => (
          <ExperienceTab
            key={`${exp.id}-${index}`}
            exp={exp}
            isEditVisible={isEditActive}
            onSaveEdit={saveEditedExperience}
            onDelete={onDeleteExperienceById}
          />
        ))}
      </div>
      <NewExperienceModal
        isEditVisible={isEditActive}
        onSaveExp={saveNewExperience}
      />
    </div>
  );
}

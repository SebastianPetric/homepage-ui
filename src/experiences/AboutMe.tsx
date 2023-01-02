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
import EditTextModal, {
  TextType,
  TText,
  TTextDTO,
} from "../shared/modals/EditTextModal";
import ExperienceTab from "./ExperienceTab";

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
    const textDt: TTextDTO = {
      text: cur.text,
      type: cur.type,
    };

    const saved: TText = await updateEntity(
      EXPERIENCE_ENDPOINT,
      cur.id,
      JSON.stringify(textDt)
    );
    setTextObj(saved);
  };

  const onDeleteExperienceById = async (id: string) => {
    await deleteEntity(EXPERIENCE_ENDPOINT, id);
    const tmp = experiences.filter((it) => it.id !== id);
    setExperiences(tmp);
  };

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"text-5xl font-bold"}>Über mich.</p>

      <span className={"w-96 h-auto mt-8"}>
        {isLoadedCovering && (
          <EditTextModal
            onSaveText={onSaveText}
            editTextObj={textObj}
            isEditActive={isEditActive}
          />
        )}
        <p dangerouslySetInnerHTML={{ __html: textObj.text }}></p>
      </span>
      <div className={"flex flex-wrap justify-start mt-16"}>
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

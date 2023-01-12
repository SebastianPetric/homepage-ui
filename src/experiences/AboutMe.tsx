import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  deleteEntity,
  findAllEntities,
  saveEntity,
  updateEntity,
} from "../shared/RestCaller";
import EditDescriptionTextModal, {
  TextType,
  TText,
} from "../shared/description/EditDescriptionTextModal";
import ExperienceTab from "./ExperienceTab";
import DescriptionText from "../shared/description/DescriptionText";
import CreateAndEditExperienceModal from "./CreateAndEditExperienceModal";
import { ENDPOINT } from "../App";
import { getUserInfo } from "../user/UserSlice";
import {
  getDescriptionByType,
  getStateByType,
} from "../covering-letter/DescriptionTextSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

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
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const dispatch = useAppDispatch();

  const description: TText = useAppSelector((state) =>
    getStateByType(state, TextType.ABOUT_ME)
  );

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getDescriptionByType(TextType.ABOUT_ME));
  }, []);

  useEffect(() => {
    const getAllExperiences = async () => {
      let response: TExperience[] = await findAllEntities(
        ENDPOINT.EXPERIENCES.valueOf()
      );
      setExperiences(response);
    };

    if (!!inView) {
      getAllExperiences();
      dispatch(getDescriptionByType(TextType.ABOUT_ME));
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

  const onDeleteExperienceById = async (id: string) => {
    await deleteEntity(ENDPOINT.EXPERIENCES.valueOf(), id);
    const tmp = experiences.filter((it) => it.id !== id);
    setExperiences(tmp);
  };

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"title"}>Über mich.</p>

      <div className={"mt-8"}>
        <EditDescriptionTextModal type={TextType.ABOUT_ME} />
      </div>
      <DescriptionText description={description} />
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

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getAllExperiences, TExperience } from "./ExperienceSlice";
import {
  TextType,
  TText,
} from "../shared/description/EditDescriptionTextModal";
import { RootState } from "../store/Store";
import {
  getDescriptionByType,
  getStateByType,
} from "../covering-letter/DescriptionTextSlice";
import DescriptionText from "../shared/description/DescriptionText";
import CreateExperience from "./CreateExperience";
import { useSelector } from "react-redux";
import ExperienceTab from "./ExperienceTab";

export default function AboutMe() {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const dispatch = useAppDispatch();

  const experiences: TExperience[] = useSelector(
    (state: RootState) => state.experiences.experiences
  );

  const description: TText = useAppSelector((state) =>
    getStateByType(state, TextType.ABOUT_ME)
  );

  useEffect(() => {
    if (inView) {
      dispatch(getDescriptionByType(TextType.ABOUT_ME));
      dispatch(getAllExperiences());
    }
  }, [inView]);

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"title"}>Über mich.</p>
      <DescriptionText type={TextType.ABOUT_ME} description={description} />
      <div className={"tile-group"}>
        {experiences.map((exp, index) => (
          <div key={index}>
            <ExperienceTab exp={exp} />
          </div>
        ))}
      </div>
      <CreateExperience />
    </div>
  );
}

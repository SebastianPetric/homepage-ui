import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  TextType,
  TText,
} from "../shared/description/EditDescriptionTextModal";
import DescriptionText from "../shared/description/DescriptionText";
import {
  getDescriptionByType,
  getStateByType,
} from "../covering-letter/DescriptionTextSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAllCareerSteps, TCareer } from "./CareerSlice";
import CreateCareer from "./CreateCareer";
import CareerTab from "./CareerTab";

export default function Career() {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const dispatch = useAppDispatch();

  const description: TText = useAppSelector((state) =>
    getStateByType(state, TextType.CAREER)
  );

  const career: TCareer[] = useAppSelector((state) => state.career.careerSteps);

  useEffect(() => {
    if (inView) {
      dispatch(getAllCareerSteps());
      dispatch(getDescriptionByType(TextType.CAREER));
    }
  }, [inView]);

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"title"}>Beruflicher Werdegang.</p>
      <DescriptionText type={TextType.CAREER} description={description} />
      <div className={"tile-group"}>
        {career.map((exp, index) => (
          <CareerTab key={`${exp.id}-${index}`} career={{ ...exp }} />
        ))}
      </div>
      <CreateCareer />
    </div>
  );
}

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import AcademicTab from "./AcademicTab";
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
import { getAllAcademicSteps, TAcademic } from "./AcademicSlice";
import CreateAcademic from "./CreateAcademic";

export default function Academic() {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const dispatch = useAppDispatch();

  const description: TText = useAppSelector((state) =>
    getStateByType(state, TextType.ACADEMIC)
  );

  const academic: TAcademic[] = useAppSelector(
    (state) => state.academic.academicSteps
  );

  useEffect(() => {
    if (inView) {
      dispatch(getAllAcademicSteps());
      dispatch(getDescriptionByType(TextType.ACADEMIC));
    }
  }, [inView]);

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"title"}>Akademischer Werdegang.</p>
      <DescriptionText type={TextType.ACADEMIC} description={description} />
      <div className={"tile-group"}>
        {academic.map((exp, index) => (
          <div key={index}>
            <AcademicTab academic={{ ...exp }} />
          </div>
        ))}
      </div>
      <CreateAcademic />
    </div>
  );
}

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import InfoTab from "./InfoTab";
import {
  TextType,
  TText,
} from "../shared/description/EditDescriptionTextModal";
import DescriptionText from "../shared/description/DescriptionText";
import CveRequest from "./CveRequest";
import {
  getDescriptionByType,
  getStateByType,
} from "../covering-letter/DescriptionTextSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export default function Info({
  shouldHighlightCveInput,
}: {
  shouldHighlightCveInput: boolean;
}) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const dispatch = useAppDispatch();

  const description: TText = useAppSelector((state) =>
    getStateByType(state, TextType.INFO)
  );

  useEffect(() => {
    if (inView) {
      dispatch(getDescriptionByType(TextType.INFO));
    }
  }, [inView]);

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"title"}>Interesse geweckt?</p>
      <DescriptionText type={TextType.INFO} description={description} />
      <div className={"tile-group"}>
        <InfoTab />
      </div>
      <CveRequest shouldHighlightCveInput={shouldHighlightCveInput} />
    </div>
  );
}

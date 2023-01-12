import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import InfoTab from "./InfoTab";
import { findTextByType } from "../shared/RestCaller";
import EditDescriptionTextModal, {
  TextType,
  TText,
} from "../shared/description/EditDescriptionTextModal";
import DescriptionText, {
  onSaveDescriptionText,
} from "../shared/description/DescriptionText";
import CveRequest from "./CveRequest";
import { ENDPOINT } from "../App";

export default function Info({
  shouldHighlightCveInput,
}: {
  shouldHighlightCveInput: boolean;
}) {
  const [textObj, setTextObj] = useState<TText>({ id: "", text: "", type: "" });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    const getCoveringLetter = async () => {
      let response: TText = await findTextByType(TextType.INFO);
      setTextObj(response);
      setIsLoaded(true);
    };

    if (!!inView) {
      getCoveringLetter();
    }
  }, [inView]);

  const onSaveEditedText = async (cur: TText) => {
    await onSaveDescriptionText(
      cur,
      ENDPOINT.COVERING_LETTER.valueOf(),
      setTextObj
    );
  };

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"title"}>Interesse geweckt?</p>
      <div className={"mt-8"}>
        {isLoaded && (
          <EditDescriptionTextModal
            onSaveText={onSaveEditedText}
            editTextObj={textObj}
          />
        )}
      </div>
      <DescriptionText text={textObj.text} />
      <div className={"tile-group"}>
        <InfoTab />
      </div>
      <CveRequest shouldHighlightCveInput={shouldHighlightCveInput} />
    </div>
  );
}

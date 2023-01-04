import { useEffect, useState } from "react";
import EditDescriptionTextModal, {
  TextType,
  TText,
} from "../shared/modals/EditDescriptionTextModal";
import { findTextByType } from "../shared/RestCaller";
import DescriptionText, {
  onSaveDescriptionText,
} from "../shared/description/DescriptionText";

export default function Greeting({ isEditActive }: { isEditActive: boolean }) {
  const [textObj, setTextObj] = useState<TText>({ id: "", text: "", type: "" });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const COVERING_ENDPOINT = "covering-letter";

  useEffect(() => {
    const getCoveringLetter = async () => {
      let response: TText = await findTextByType(TextType.COVERING);
      setTextObj(response);
      setIsLoaded(true);
    };
    getCoveringLetter();
  }, []);

  const onSaveText = async (cur: TText) => {
    await onSaveDescriptionText(cur, COVERING_ENDPOINT, setTextObj);
  };

  return (
    <div className={"flex flex-col"}>
      <p className={"title"}>Sebastian Petöcz.</p>
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
    </div>
  );
}

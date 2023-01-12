import { TText, TTextDTO } from "./EditDescriptionTextModal";
import { updateEntity } from "../RestCaller";

export default function DescriptionText({
  description,
}: {
  description: TText;
}) {
  return (
    <p
      className={"max-w-sm h-full"}
      dangerouslySetInnerHTML={{ __html: description?.text }}
    ></p>
  );
}

export const onSaveDescriptionText = async (
  cur: TText,
  endpoint: string,
  setTextObj: (cur: TText) => void
) => {
  const textDt: TTextDTO = {
    text: cur.text,
    type: cur.type,
  };

  const saved: TText = await updateEntity(
    endpoint,
    cur.id,
    JSON.stringify(textDt)
  );
  setTextObj(saved);
};

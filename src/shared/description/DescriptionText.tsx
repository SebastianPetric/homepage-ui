import EditDescriptionTextModal, {
  TextType,
  TText,
} from "./EditDescriptionTextModal";

export default function DescriptionText({
  type,
  description,
}: {
  type: TextType;
  description: TText;
}) {
  return (
    <>
      <div className={"mt-8"}>
        <EditDescriptionTextModal type={type} />
      </div>
      <p
        className={"max-w-md h-full"}
        dangerouslySetInnerHTML={{ __html: description?.text }}
      ></p>
    </>
  );
}

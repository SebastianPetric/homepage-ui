export default function DescriptionText({ text }: { text: string }) {
  return (
    <p
      className={"max-w-sm h-full"}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

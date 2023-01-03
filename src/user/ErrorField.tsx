export type Exception = {
  description: string;
  message: string;
  timestamp: string;
};

export default function ErrorField({
  error,
}: {
  error: Exception | undefined;
}) {
  return (
    <>
      {error && (
        <p
          className={
            "border-2 border-red-500 text-red-500 h-auto w-full flex items-center justify-center mb-2 font-bold p-2"
          }
        >
          {error.message}
        </p>
      )}
    </>
  );
}

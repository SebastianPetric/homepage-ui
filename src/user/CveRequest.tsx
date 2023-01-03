import { useEffect, useState } from "react";
import { sendEmail } from "../shared/RestCaller";
import ErrorField, { Exception } from "./ErrorField";
import Spinner from "./Spinner";

export default function CveRequest() {
  const [email, setEmail] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>();
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<Exception | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (email === undefined || email === "") setIsButtonEnabled(false);
    else setIsButtonEnabled(true);
  }, [email]);

  const send = async () => {
    setIsLoading(true);
    const res = await sendEmail(email);
    if (res) setError(res);
    else {
      setIsEmailSent(true);
      setError(undefined);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isEmailSent ? (
        <div className={"w-full mt-10"}>
          <ErrorField error={error} />
          <input
            className={"border-2 w-full mb-2 h-20 text-center"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Email"}
          />
          <button
            disabled={!isButtonEnabled}
            onClick={send}
            className={`${
              isButtonEnabled
                ? "bg-green-500 hover:text-white text-imageColor"
                : "bg-gray-500 text-gray-800"
            } w-full h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold  cursor-pointer`}
          >
            Lebenslauf anfragen {<Spinner shouldBeDisplayed={isLoading} />}
          </button>
        </div>
      ) : (
        <div
          className={
            "mt-10 bg-gray-500 text-gray-800 w-full h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold"
          }
        >
          Anfrage gesendet
        </div>
      )}
    </>
  );
}

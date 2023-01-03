import React, { useEffect, useRef, useState } from "react";
import { sendEmail } from "../shared/RestCaller.ts";
import ErrorField from "./ErrorField.tsx";
import Spinner from "./Spinner.tsx";
import { WidgetInstance } from "friendly-challenge";

export default function CveRequest() {
  const [email, setEmail] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaPassed, setCaptchaPassed] = useState(true);

  const container = useRef();
  const widget = useRef();

  const doneCallback = () => {
    console.log("Captcha was solved. The form can be submitted.");
    setCaptchaPassed(true);
  };

  const errorCallback = () => {
    console.log("There was an error when trying to solve the Captcha.");
    setCaptchaPassed(false);
  };

  const validateCaptcha = () => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: "auto",
        doneCallback: doneCallback,
        errorCallback: errorCallback,
      });
    }

    return () => {
      if (widget.current != undefined) widget.current.reset();
    };
  };

  useEffect(() => {
    if (email === undefined || email === "") setIsButtonEnabled(false);
    else setIsButtonEnabled(true);
  }, [email]);

  const send = async () => {
    setIsLoading(true);
    validateCaptcha();

    if (!captchaPassed) {
      setIsLoading(false);
      return;
    }

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
            contentEditable={false}
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
            {isLoading ? "Anfrage wird gesendet..." : "Lebenslauf anfragen"}{" "}
            {<Spinner shouldBeDisplayed={isLoading} />}
          </button>
          <div
            ref={container}
            className="border-none flex justify-center items-center"
            data-sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
          />
        </div>
      ) : (
        <>
          {" "}
          <div
            className={
              "mt-10 bg-gray-500 text-gray-800 w-full h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold"
            }
          >
            Anfrage gesendet
          </div>
        </>
      )}
    </>
  );
}

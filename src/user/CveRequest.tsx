import ErrorField, { Exception } from "./ErrorField";
import Spinner from "./Spinner";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { sendEmail } from "../shared/RestCaller";
import { WidgetInstance } from "friendly-challenge";
import { Tooltip } from "@material-tailwind/react";

export default function CveRequest({
  shouldHighlightCveInput,
}: {
  shouldHighlightCveInput: boolean;
}) {
  const [email, setEmail] = useState<string>("");
  const [optionalText, setOptionalText] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>();
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<Exception | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [captchaPassed, setCaptchaPassed] = useState<boolean>(true);

  const container = useRef() as MutableRefObject<HTMLInputElement>;
  const widget = useRef<WidgetInstance>();

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

    const res = await sendEmail(email, optionalText);
    if (res)
      setError({
        description: res.message,
        message: res.errors[0].defaultMessage,
        timestamp: res.timeStamp,
      });
    else {
      setIsEmailSent(true);
      setError(undefined);
    }
    setIsLoading(false);
  };

  const transitionColorsForHighlighting = () => {
    return shouldHighlightCveInput ? "border-green-600" : "border-gray-900";
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

  const doneCallback = () => {
    console.log("Captcha was solved. The form can be submitted.");
    setCaptchaPassed(true);
  };

  const errorCallback = () => {
    setError({
      description: "captcha error",
      message: "There was an error when trying to solve the Captcha.",
      timestamp: new Date().toDateString(),
    });
    setCaptchaPassed(false);
  };

  return (
    <>
      <>
        {!isEmailSent ? (
          <div className={"w-full mt-10"}>
            <ErrorField error={error} />
            <Tooltip
              open={shouldHighlightCveInput}
              content={"Hier anfragen"}
              placement={"top"}
              className={"bg-green-400"}
            >
              <input
                contentEditable={false}
                className={`border-2 rounded w-full mb-2 h-20 text-center transition-all duration-700 ${transitionColorsForHighlighting()}`}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"Email"}
              />
            </Tooltip>
            <textarea
              className={
                "w-full h-auto border-gray-900 border-2 rounded text-center pt-7"
              }
              placeholder={"Optionale Nachricht"}
              onChange={(e) => setOptionalText(e.target.value)}
              value={optionalText}
            ></textarea>
            <button
              disabled={!isButtonEnabled}
              onClick={send}
              className={`${
                isButtonEnabled
                  ? "bg-green-500 hover:text-white text-imageColor"
                  : "bg-gray-500 text-gray-800"
              } w-full h-20 rounded rounded-br-3xl flex items-center justify-center text-xl font-bold  cursor-pointer`}
            >
              {isLoading ? "Anfrage wird gesendet..." : "Lebenslauf anfragen"}{" "}
              {<Spinner shouldBeDisplayed={isLoading} />}
            </button>
            <div
              ref={container ? container : undefined}
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
    </>
  );
}

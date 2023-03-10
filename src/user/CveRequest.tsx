import ErrorField, { Exception } from "./ErrorField";
import Spinner from "./Spinner";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { sendEmail } from "../shared/RestCaller";
import { WidgetInstance } from "friendly-challenge";
import { Tooltip } from "@material-tailwind/react";

export type FriendlyCaptchaResponse = {
  success: boolean;
  errors: string[];
};

export default function CveRequest({
  shouldHighlightCveInput,
}: {
  shouldHighlightCveInput: boolean;
}) {
  const [email, setEmail] = useState<string>("");
  const [optionalText, setOptionalText] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>();
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [clientCaptchaError, setClientCaptchaError] = useState<
    Exception | undefined
  >(undefined);
  const [serverCaptchaValidationErrors, setServerCaptchaValidationErrors] =
    useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientCaptchaPassed, setClientCaptchaPassed] = useState<boolean>(true);
  const [clientCaptchaSolution, setClientCaptchaSolution] =
    useState<string>("");

  const container = useRef() as MutableRefObject<HTMLInputElement>;
  const widget = useRef<WidgetInstance>();

  useEffect(() => {
    if (email === undefined || email === "" || clientCaptchaSolution === "")
      setIsButtonEnabled(false);
    else setIsButtonEnabled(true);
  }, [email, clientCaptchaSolution]);

  useEffect(() => {
    validateCaptcha();
  }, []);

  const send = async () => {
    setIsLoading(true);

    if (!clientCaptchaPassed) {
      setIsLoading(false);
      return;
    }

    const res = await sendEmail(email, clientCaptchaSolution, optionalText);
    if (res && (res.status === 503 || res.status === 400)) {
      const serverError: Exception = await res.json();
      setClientCaptchaError({
        rejectedField: `${serverError.rejectedField}`,
        rejectedValue: `${serverError.rejectedValue}`,
        message: `${serverError.message}`,
        timestamp: `${serverError.timestamp}`,
      });
    } else {
      if (res) {
        const serverResponse: FriendlyCaptchaResponse = await res.json();
        if (!serverResponse.success)
          setServerCaptchaValidationErrors(serverResponse.errors);
      }
      setIsEmailSent(true);
    }
    setIsLoading(false);
  };

  const transitionColorsForHighlighting = () => {
    return shouldHighlightCveInput
      ? "border-accentColor"
      : `${clientCaptchaError ? "border-red-500" : "border-gray-900"}`;
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

  const doneCallback = (solution: string) => {
    console.log("Captcha was solved. The form can be submitted.");
    setClientCaptchaSolution(solution);
    setClientCaptchaPassed(true);
  };

  const errorCallback = (err: any) => {
    setClientCaptchaError({
      rejectedField: "",
      rejectedValue: "",
      message: `There was an error while trying to solve the Captcha. ${err.rawError}`,
      timestamp: new Date().toDateString(),
    });
    setClientCaptchaPassed(false);
  };

  return (
    <>
      {!isEmailSent ? (
        <div className={"w-full mt-10"}>
          <ErrorField error={clientCaptchaError} />
          <Tooltip
            open={shouldHighlightCveInput}
            content={"Hier anfragen"}
            placement={"top"}
            className={"bg-accentColor"}
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
                ? "bg-accentColor hover:text-white text-textColor"
                : "bg-gray-500 text-gray-800"
            } w-full h-20 rounded rounded-br-3xl flex items-center justify-center text-xl font-bold  cursor-pointer`}
          >
            {isLoading ? "Anfrage wird gesendet..." : "Lebenslauf anfragen"}{" "}
            {<Spinner shouldBeDisplayed={isLoading} />}
          </button>
          <div className="flex flex-col">
            <div
              ref={container ? container : undefined}
              className="border-none flex justify-center items-center"
              data-sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
            />
          </div>
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

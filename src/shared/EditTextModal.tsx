import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/all";

export type TText = {
  id: string;
  type: string;
  text: string;
};

export type TTextDTO = {
  type: string;
  text: string;
};

export enum TextType {
  COVERING = "COVERING",
  ABOUT_ME = "ABOUT_ME",
  CAREER = "CAREER",
  ACADEMIC = "ACADEMIC",
  INFO = "INFO",
}

export default function EditTextModal({
  onSaveText,
  editTextObj,
}: {
  onSaveText: (obj: TText) => void;
  editTextObj: TText;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [text, setText] = useState<string>(editTextObj.text);

  useEffect(() => {
    if (text !== "") setIsSavingPossible(true);
    else setIsSavingPossible(false);
  }, [text]);

  const onSave = () => {
    setShowModal(false);
    let newObj: TText = {
      id: editTextObj.id,
      type: editTextObj.type,
      text: text,
    };
    onSaveText(newObj);
  };

  return (
    <>
      <FaEdit
        className={"hover:text-green-600 cursor-pointer mb-2"}
        onClick={() => setShowModal(true)}
      />
      {showModal ? (
        <>
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left w-full">
                    <h4 className="text-lg font-medium text-gray-800">
                      Bearbeiten
                    </h4>
                    <div>
                      <p className={"mt-5"}>Typ:</p>
                      <p>{editTextObj.type}</p>

                      <p className={"mt-5"}>Text</p>
                      <textarea
                        className={"border-2 w-full h-72 mt-2 mb-2"}
                        onChange={(event) => setText(event.target.value)}
                        value={text}
                      ></textarea>
                    </div>
                    <div className="items-center gap-2 mt-3 sm:flex mt-5">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-600 focus:ring-2"
                        disabled={!isSavingPossible}
                        onClick={onSave}
                      >
                        Speichern
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShowModal(false)}
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

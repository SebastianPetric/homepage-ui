import React, { useEffect, useState } from "react";
import SaveAndCancelButtons from "./SaveAndCancelButtons";
import Modal from "./Modal";
import ModalEditButton from "./ModalEditButton";

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
  isEditActive,
}: {
  onSaveText: (obj: TText) => void;
  editTextObj: TText;
  isEditActive: boolean;
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
      <ModalEditButton
        setShowModal={setShowModal}
        isEditVisible={isEditActive}
      />
      <Modal
        shouldShowModal={showModal}
        setShowModal={setShowModal}
        titleModal={"Bearbeiten"}
      >
        <div>
          <p className={"mt-5 font-bold"}>Typ:</p>
          <p>{editTextObj.type}</p>

          <p className={"mt-5 font-bold"}>Text:</p>
          <textarea
            className={"border-2 w-full h-72 mt-2 mb-2"}
            onChange={(event) => setText(event.target.value)}
            value={text}
          ></textarea>
        </div>
        <SaveAndCancelButtons
          isSavingPossible={isSavingPossible}
          onSave={onSave}
          setShowModal={setShowModal}
        />
      </Modal>
    </>
  );
}

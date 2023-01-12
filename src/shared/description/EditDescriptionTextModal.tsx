import React, { useEffect, useState } from "react";
import SaveAndCancelButtons from "../modals/SaveAndCancelButtons";
import Modal from "../modals/Modal";
import ModalEditButton from "../modals/ModalEditButton";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  editDescriptionById,
  getStateByType,
  update,
} from "../../covering-letter/DescriptionTextSlice";

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

export default function EditDescriptionTextModal({ type }: { type: TextType }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const description: TText = useAppSelector((state) =>
    getStateByType(state, type)
  );

  useEffect(() => {
    if (description.text !== "") setIsSavingPossible(true);
    else setIsSavingPossible(false);
  }, [description.text]);

  const onSave = () => {
    setShowModal(false);
    dispatch(editDescriptionById(description));
  };

  return (
    <>
      <ModalEditButton setShowModal={setShowModal} />
      <Modal
        shouldShowModal={showModal}
        setShowModal={setShowModal}
        titleModal={"Bearbeiten"}
      >
        <div>
          <p className={"mt-5 font-bold"}>Typ:</p>
          <p>{description.type}</p>

          <p className={"mt-5 font-bold"}>Text:</p>
          <textarea
            className={"border-2 w-full h-72 mt-2 mb-2"}
            onChange={(event) =>
              dispatch(update({ ...description, text: event.target.value }))
            }
            value={description.text}
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

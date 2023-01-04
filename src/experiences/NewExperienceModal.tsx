import React, { useEffect, useState } from "react";
import { TExperienceDTO } from "./AboutMe";
import ModalCreateButton from "../shared/modals/ModalCreateButton";
import ModalExperienceItems from "../shared/modals/ModalExperienceItems";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import ModalItem from "../shared/modals/ModalItem";
import Modal from "../shared/modals/Modal";
import { TKeyValue } from "../shared/modals/EditAcademicCareerStepModal";
import {
  addExperiencePoint,
  deleteExperiencePoint,
  editAndSetExperiencePoint,
} from "../shared/modals/ExperiencePointsInModalEditor";
import { validateExperienceModalFieldsNotEmpty } from "../shared/modals/ModalFieldValidator";

export default function NewExperienceModal({
  onSaveExp,
  isEditVisible,
}: {
  onSaveExp: (exp: TExperienceDTO) => void;
  isEditVisible: boolean;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [experiences, setExperiences] = useState<TKeyValue[]>([]);

  useEffect(() => {
    validateExperienceModalFieldsNotEmpty(
      experiences,
      title,
      setIsSavingPossible
    );
  }, [title, experiences]);

  const editSpecificExperiencePoint = (cur: TKeyValue) => {
    editAndSetExperiencePoint(cur, experiences, setExperiences);
  };

  const addNewExperiencePoint = () => {
    addExperiencePoint(experiences, setExperiences);
  };

  const deleteSpecificExperiencePoint = (cur: TKeyValue) => {
    deleteExperiencePoint(cur, experiences, setExperiences);
  };

  const onSave = () => {
    setShowModal(false);
    let tmp = [...experiences];
    let expArray: string[] = tmp
      .filter((exp) => exp.value !== "")
      .map((it) => it.value);
    let newObj: TExperienceDTO = {
      title: title,
      experiencePoints: expArray,
    };
    onSaveExp(newObj);
  };

  return (
    <>
      <>
        <ModalCreateButton
          setShowModal={setShowModal}
          isEditVisible={isEditVisible}
        />
        <Modal
          shouldShowModal={showModal}
          setShowModal={setShowModal}
          titleModal={"Erfahrungen hinzufügen"}
        >
          <ModalItem title={"Titel"} value={title} setValue={setTitle} />
          <ModalExperienceItems
            experiencePoints={experiences}
            addNewExperiencePoint={addNewExperiencePoint}
            editSingleExperiencePoint={editSpecificExperiencePoint}
            deleteSpecificExperiencePoint={deleteSpecificExperiencePoint}
          />

          <SaveAndCancelButtons
            isSavingPossible={isSavingPossible}
            onSave={onSave}
            setShowModal={setShowModal}
          />
        </Modal>
      </>
    </>
  );
}

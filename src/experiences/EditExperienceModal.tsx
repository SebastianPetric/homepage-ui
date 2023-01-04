import React, { useEffect, useState } from "react";
import { TExperience } from "./AboutMe";
import ModalItem from "../shared/modals/ModalItem";
import ModalExperienceItems from "../shared/modals/ModalExperienceItems";
import Modal from "../shared/modals/Modal";
import SaveAndCancelButtonsEditExperience from "../shared/modals/SaveAndCancelButtonsEditExperience";
import ModalEditButton from "../shared/modals/ModalEditButton";
import { FaMinus } from "react-icons/all";
import { TKeyValue } from "../shared/modals/EditStepModal";
import {
  addExperiencePoint,
  deleteExperiencePoint,
  editAndSetExperiencePoint,
} from "../shared/modals/ExperiencePointsInModalEditor";
import { validateExperienceModalFieldsNotEmpty } from "../shared/modals/ModalFieldValidator";

export default function EditExperienceModal({
  onSaveExp,
  onDelete,
  id,
  isEditVisible,
  experience,
}: {
  onSaveExp: (exp: TExperience) => void;
  onDelete: (id: string) => void;
  id: string;
  isEditVisible: boolean;
  experience: TExperience;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(experience.title);
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [experiencePoints, setExperiencePoints] = useState<TKeyValue[]>([]);

  useEffect(() => {
    const tmp = experience.experiencePoints.map((it) => {
      return {
        key: `new-${Math.random() * 10}`,
        value: it,
      };
    });
    setExperiencePoints(tmp);
  }, []);

  useEffect(() => {
    validateExperienceModalFieldsNotEmpty(
      experiencePoints,
      title,
      setIsSavingPossible
    );
  }, [title, experiencePoints]);

  const editSpecificExperiencePoint = (cur: TKeyValue) => {
    editAndSetExperiencePoint(cur, experiencePoints, setExperiencePoints);
  };

  const addNewExperiencePoint = () => {
    addExperiencePoint(experiencePoints, setExperiencePoints);
  };

  const deleteSpecificExperiencePoint = (cur: TKeyValue) => {
    deleteExperiencePoint(cur, experiencePoints, setExperiencePoints);
  };

  const onSave = (id: string) => {
    setShowModal(false);
    let tmp = [...experiencePoints];
    let expArray: string[] = tmp
      .filter((exp) => exp.value !== "")
      .map((it) => it.value);
    let newObj: TExperience = {
      id: id,
      title: title,
      experiencePoints: expArray,
    };
    onSaveExp(newObj);
  };

  return (
    <>
      <ModalEditButton
        setShowModal={setShowModal}
        isEditVisible={isEditVisible}
      />
      {isEditVisible && (
        <FaMinus className={"deleteButton"} onClick={() => onDelete(id)} />
      )}
      <Modal
        shouldShowModal={showModal}
        setShowModal={setShowModal}
        titleModal={"Erfahrungen hinzufügen"}
      >
        <ModalItem title={"Titel"} value={title} setValue={setTitle} />

        <ModalExperienceItems
          experiencePoints={experiencePoints}
          addNewExperiencePoint={addNewExperiencePoint}
          editSingleExperiencePoint={editSpecificExperiencePoint}
          deleteSpecificExperiencePoint={deleteSpecificExperiencePoint}
        />
        <SaveAndCancelButtonsEditExperience
          isSavingPossible={isSavingPossible}
          onSave={onSave}
          id={experience.id}
          setShowModal={setShowModal}
        />
      </Modal>
    </>
  );
}

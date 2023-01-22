import ModalItem from "../shared/modals/ModalItem";
import ModalExperienceItems from "../shared/modals/ModalExperienceItems";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import Modal from "../shared/modals/Modal";
import React, { useEffect, useState } from "react";
import { onChangeExperiencePointItem } from "../shared/modals/ExperiencePointsInModalEditor";
import { validateExperienceModalFieldsNotEmpty } from "../shared/modals/ModalFieldValidator";
import { useAppDispatch } from "../hooks/hooks";
import {
  createExperience,
  TExperience,
  TExperiencePoint,
  TKeyValue,
  updateExperience,
} from "./ExperienceSlice";

export default function ExperienceModal({
  showModal,
  setShowModal,
  experience,
}: {
  showModal: boolean;
  setShowModal: (shouldShow: boolean) => void;
  experience: TExperience;
}) {
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [editedExperience, setEditedExperience] =
    useState<TExperience>(experience);
  const setExpPoints = (cur: TExperiencePoint[]) => {
    setEditedExperience({ ...editedExperience, experiencePoints: cur });
  };

  const dispatch = useAppDispatch();

  const onChangeItem = (cur: TKeyValue) => {
    onChangeExperiencePointItem(editedExperience, setEditedExperience, cur);
  };

  const onSave = () => {
    if (experience.id) {
      dispatch(updateExperience(editedExperience));
      setEditedExperience(editedExperience);
    } else {
      dispatch(createExperience(editedExperience));
      setEditedExperience({ title: "", experiencePoints: [] });
    }
    setShowModal(false);
  };

  useEffect(() => {
    validateExperienceModalFieldsNotEmpty(
      editedExperience.experiencePoints,
      editedExperience.title,
      setIsSavingPossible
    );
  }, [editedExperience]);

  return (
    <Modal
      shouldShowModal={showModal}
      setShowModal={setShowModal}
      titleModal={"Erfahrungen hinzufügen"}
    >
      <ModalItem
        title={"Titel"}
        keyValue={{ key: "title", value: editedExperience.title }}
        onChangeItem={onChangeItem}
      />

      <ModalExperienceItems
        experiencePoints={editedExperience.experiencePoints}
        setExperiencepPoints={setExpPoints}
      />
      <SaveAndCancelButtons
        isSavingPossible={isSavingPossible}
        onSave={onSave}
        setShowModal={setShowModal}
      />
    </Modal>
  );
}

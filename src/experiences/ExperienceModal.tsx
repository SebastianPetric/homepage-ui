import ModalItem from "../shared/modals/ModalItem";
import ModalExperienceItems from "../shared/modals/ModalExperienceItems";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import Modal from "../shared/modals/Modal";
import React, { useEffect, useState } from "react";
import { onChangeExperiencePointItem } from "../shared/modals/ExperiencePointsInModalEditor";
import { validateExperienceModalFieldsNotEmpty } from "../shared/modals/ModalFieldValidator";
import { useAppDispatch } from "../hooks/hooks";
import { createExperience, TExperience, TKeyValue } from "./ExperienceSlice";

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
  const setExpPoints = (cur: string[]) => {
    setEditedExperience({ ...editedExperience, experiencePoints: cur });
  };

  const dispatch = useAppDispatch();

  const onChangeItem = (cur: TKeyValue) => {
    onChangeExperiencePointItem(experience, setEditedExperience, cur);
  };

  const onSave = () => {
    dispatch(createExperience(experience));
    setShowModal(false);
  };

  useEffect(() => {
    validateExperienceModalFieldsNotEmpty(
      experience.experiencePoints,
      experience.title,
      setIsSavingPossible
    );
  }, [experience]);

  return (
    <Modal
      shouldShowModal={showModal}
      setShowModal={setShowModal}
      titleModal={"Erfahrungen hinzufügen"}
    >
      <ModalItem
        title={"Titel"}
        keyValue={{ key: "title", value: experience.title }}
        onChangeItem={onChangeItem}
      />

      <ModalExperienceItems
        experiencePoints={experience.experiencePoints}
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

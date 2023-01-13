import ModalItem from "../shared/modals/ModalItem";
import ModalExperienceItems from "../shared/modals/ModalExperienceItems";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import Modal from "../shared/modals/Modal";
import React from "react";
import {
  TExperience,
  TIndexValue,
  TKeyValue,
} from "../shared/modals/ExperiencePointsInModalEditor";

export default function ExperienceModal({
  showModal,
  setShowModal,
  isSavingPossible,
  experience,
  onAddNewExperiencePoint,
  onEditSingleExperiencePoint,
  onDeleteSpecificExperiencePoint,
  onChangeItem,
  onSave,
}: {
  showModal: boolean;
  setShowModal: (shouldShow: boolean) => void;
  isSavingPossible: boolean;
  experience: TExperience;
  onAddNewExperiencePoint: (cur: string) => void;
  onEditSingleExperiencePoint: (cur: TIndexValue) => void;
  onDeleteSpecificExperiencePoint: (index: number) => void;
  onChangeItem: (cur: TKeyValue) => void;
  onSave: () => void;
}) {
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
        addNewExperiencePoint={onAddNewExperiencePoint}
        editSingleExperiencePoint={onEditSingleExperiencePoint}
        deleteSpecificExperiencePoint={onDeleteSpecificExperiencePoint}
      />
      <SaveAndCancelButtons
        isSavingPossible={isSavingPossible}
        onSave={onSave}
        setShowModal={setShowModal}
      />
    </Modal>
  );
}

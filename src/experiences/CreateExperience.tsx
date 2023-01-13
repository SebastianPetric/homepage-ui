import ModalCreateButton from "../shared/modals/ModalCreateButton";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { createExperience } from "./ExperienceSlice";
import {
  addNewExperiencePoint,
  deleteSpecificExperiencePoint,
  editSingleExperiencePoint,
  onChangeExperiencePointItem,
  TExperienceDTO,
  TIndexValue,
  TKeyValue,
} from "../shared/modals/ExperiencePointsInModalEditor";
import ExperienceModal from "./ExperienceModal";
import { validateExperienceModalFieldsNotEmpty } from "../shared/modals/ModalFieldValidator";

export default function CreateExperience() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [experience, setExperience] = useState<TExperienceDTO>({
    title: "",
    experiencePoints: [],
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    validateExperienceModalFieldsNotEmpty(
      experience.experiencePoints,
      experience.title,
      setIsSavingPossible
    );
  }, [experience]);

  const onAddNewExperiencePoint = (cur: string) => {
    addNewExperiencePoint(experience, setExperience, cur);
  };

  const onEditSingleExperiencePoint = (cur: TIndexValue) => {
    editSingleExperiencePoint(experience, setExperience, cur);
  };

  const onDeleteSpecificExperiencePoint = (index: number) => {
    deleteSpecificExperiencePoint(experience, setExperience, index);
  };

  const onChangeItem = (cur: TKeyValue) => {
    onChangeExperiencePointItem(experience, setExperience, cur);
  };

  const onSave = () => {
    dispatch(createExperience(experience));
    setShowModal(false);
  };

  return (
    <>
      <ModalCreateButton setShowModal={setShowModal} />
      <ExperienceModal
        showModal={showModal}
        setShowModal={setShowModal}
        isSavingPossible={isSavingPossible}
        experience={experience}
        onAddNewExperiencePoint={onAddNewExperiencePoint}
        onEditSingleExperiencePoint={onEditSingleExperiencePoint}
        onDeleteSpecificExperiencePoint={onDeleteSpecificExperiencePoint}
        onChangeItem={onChangeItem}
        onSave={onSave}
      />
    </>
  );
}

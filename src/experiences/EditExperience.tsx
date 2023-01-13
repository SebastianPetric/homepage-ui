import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { updateExperience } from "./ExperienceSlice";
import {
  addNewExperiencePoint,
  deleteSpecificExperiencePoint,
  editSingleExperiencePoint,
  onChangeExperiencePointItem,
  TExperience,
  TIndexValue,
  TKeyValue,
} from "../shared/modals/ExperiencePointsInModalEditor";
import ExperienceModal from "./ExperienceModal";
import { validateExperienceModalFieldsNotEmpty } from "../shared/modals/ModalFieldValidator";

export default function EditExperience({
  exp,
  showMdl,
  setShowMdl,
}: {
  exp: TExperience;
  showMdl: boolean;
  setShowMdl: (shouldShow: boolean) => void;
}) {
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [experience, setExperience] = useState<TExperience>(exp);
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
    dispatch(updateExperience(experience));
    setShowMdl(false);
  };

  return (
    <ExperienceModal
      showModal={showMdl}
      setShowModal={setShowMdl}
      isSavingPossible={isSavingPossible}
      experience={experience}
      onAddNewExperiencePoint={onAddNewExperiencePoint}
      onEditSingleExperiencePoint={onEditSingleExperiencePoint}
      onDeleteSpecificExperiencePoint={onDeleteSpecificExperiencePoint}
      onChangeItem={onChangeItem}
      onSave={onSave}
    />
  );
}

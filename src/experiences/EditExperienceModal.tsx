import React, { useEffect, useState } from "react";
import { TExperience } from "./AboutMe";
import { TExp } from "./NewExperienceModal";
import ModalItem from "../shared/modals/ModalItem";
import ModalExperienceItems from "../shared/modals/ModalExperienceItems";
import Modal from "../shared/modals/Modal";
import SaveAndCancelButtonsEditExperience from "../shared/modals/SaveAndCancelButtonsEditExperience";
import ModalEditButton from "../shared/modals/ModalEditButton";
import { FaMinus } from "react-icons/all";

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
  const [experiencePoints, setExperiencePoints] = useState<TExp[]>([]);

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
    let tmp = experiencePoints.map((it) => it.value);
    if (title !== "" && tmp.length !== 0 && !tmp.includes(""))
      setIsSavingPossible(true);
    else setIsSavingPossible(false);
  }, [title, experiencePoints]);

  const editSpecificExperiencePoint = (cur: TExp) => {
    let tmp = [...experiencePoints];
    tmp.forEach((exp) => {
      if (exp.key === cur.key) {
        exp.value = cur.value;
      }
    });
    setExperiencePoints(tmp);
  };

  const addNewExperiencePoint = () => {
    let newExp: TExp = {
      key: `new-${Math.random() * 10}`,
      value: "",
    };
    let tmp = [...experiencePoints, newExp];
    setExperiencePoints(tmp);
  };

  const deleteSpecificExperiencePoint = (cur: TExp) => {
    let tmp = experiencePoints.filter((it) => it !== cur);
    setExperiencePoints(tmp);
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

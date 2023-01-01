import React, { useEffect, useState } from "react";
import { TExperienceDTO } from "./AboutMe";
import ModalCreateButton from "../shared/modals/ModalCreateButton";
import ModalExperienceItems from "../shared/modals/ModalExperienceItems";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import ModalItem from "../shared/modals/ModalItem";
import Modal from "../shared/modals/Modal";

export type TExp = {
  key: string;
  value: string;
};

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
  const [experiences, setExperiences] = useState<TExp[]>([]);

  useEffect(() => {
    let tmp = experiences.map((it) => it.value);
    if (title !== "" && tmp.length !== 0 && !tmp.includes(""))
      setIsSavingPossible(true);
    else setIsSavingPossible(false);
  }, [title, experiences]);

  const editSpecificExperiencePoint = (cur: TExp) => {
    let tmp = [...experiences];
    tmp.forEach((exp) => {
      if (exp.key === cur.key) {
        exp.value = cur.value;
      }
    });
    setExperiences(tmp);
  };

  const addNewExperiencePoint = () => {
    let newExp: TExp = {
      key: `new-${Math.random() * 10}`,
      value: "",
    };
    let tmp = [...experiences, newExp];
    setExperiences(tmp);
  };

  const deleteSpecificExperiencePoint = (cur: TExp) => {
    let tmp = experiences.filter((it) => it !== cur);
    setExperiences(tmp);
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

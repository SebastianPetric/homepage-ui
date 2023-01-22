import Modal from "../shared/modals/Modal";
import ModalItem from "../shared/modals/ModalItem";
import React, { useEffect, useState } from "react";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import CustomDatePicker, { format } from "../util/DateFormatter";
import { TKeyValue } from "../experiences/ExperienceSlice";
import { TCareer } from "./CareerSlice";
import { validateCareerModalFieldsNotEmpty } from "../shared/modals/ModalFieldValidator";
import ModalExperienceItemsCareerAcademic from "../shared/modals/ModalExperienceItemsCareerAcademic";

export default function CareerModal({
  titleModal,
  career,
  showModal,
  setShowModal,
  onSaveCareer,
}: {
  titleModal: string;
  career: TCareer;
  showModal: boolean;
  setShowModal: (shouldShow: boolean) => void;
  onSaveCareer: (cur: TCareer) => void;
}) {
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [editedCareer, setEditedCareer] = useState<TCareer>(career);

  useEffect(() => {
    validateCareerModalFieldsNotEmpty(editedCareer, setIsSavingPossible);
  }, [editedCareer]);

  const onSave = (cur: TCareer) => {
    setShowModal(false);
    onSaveCareer(cur);
  };

  const onChangeItem = (cur: TKeyValue) => {
    let tmp = { ...editedCareer, [cur.key]: cur.value };
    setEditedCareer(tmp);
  };

  const setStartDate = (cur: Date | null) => {
    setEditedCareer({ ...editedCareer, from_date: format(cur) });
  };

  const setEndDate = (cur: Date | null) => {
    setEditedCareer({ ...editedCareer, to_date: format(cur) });
  };

  const setExpPoints = (cur: string[]) => {
    setEditedCareer({ ...editedCareer, toDos: cur });
  };

  return (
    <Modal
      shouldShowModal={showModal}
      setShowModal={setShowModal}
      titleModal={titleModal}
    >
      <ModalItem
        title={"Titel"}
        keyValue={{ key: "title", value: editedCareer.title }}
        onChangeItem={onChangeItem}
      />

      <ModalItem
        title={"Institution"}
        keyValue={{ key: "company", value: editedCareer.company }}
        onChangeItem={onChangeItem}
      />

      <CustomDatePicker
        startDate={new Date(editedCareer.from_date)}
        endDate={editedCareer.to_date ? new Date(editedCareer.to_date) : null}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <ModalExperienceItemsCareerAcademic
        experiencePoints={editedCareer.toDos}
        setExperiencepPoints={setExpPoints}
      />

      <SaveAndCancelButtons
        isSavingPossible={isSavingPossible}
        onSave={() => onSave(editedCareer)}
        setShowModal={setShowModal}
      />
    </Modal>
  );
}

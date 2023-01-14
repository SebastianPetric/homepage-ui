import Modal from "../shared/modals/Modal";
import ModalItem from "../shared/modals/ModalItem";
import React, { useEffect, useState } from "react";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import CustomDatePicker, { format } from "../util/DateFormatter";
import ModalExperienceItems from "../shared/modals/ModalExperienceItems";
import { TKeyValue } from "../experiences/ExperienceSlice";
import { TAcademic } from "./AcademicSlice";

export default function AcademicModal({
  titleModal,
  academic,
  showModal,
  setShowModal,
  onSaveCareer,
}: {
  titleModal: string;
  academic: TAcademic;
  showModal: boolean;
  setShowModal: (shouldShow: boolean) => void;
  onSaveCareer: (cur: TAcademic) => void;
}) {
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [editedAcademic, setEditedAcademic] = useState<TAcademic>(academic);

  useEffect(() => {
    if (
      editedAcademic.title === "" ||
      editedAcademic.school === "" ||
      editedAcademic.from_date == undefined ||
      editedAcademic.focusList.length === 0 ||
      editedAcademic.focusList.find((it) => it === "") !== undefined
    )
      setIsSavingPossible(false);
    else setIsSavingPossible(true);
  }, [editedAcademic]);

  const onSave = (cur: TAcademic) => {
    setShowModal(false);
    onSaveCareer(cur);
  };

  const onChangeItem = (cur: TKeyValue) => {
    let tmp = { ...editedAcademic, [cur.key]: cur.value };
    setEditedAcademic(tmp);
  };

  const setStartDate = (cur: Date | null) => {
    setEditedAcademic({ ...editedAcademic, from_date: format(cur) });
  };

  const setEndDate = (cur: Date | null) => {
    setEditedAcademic({ ...editedAcademic, to_date: format(cur) });
  };

  const setExpPoints = (cur: string[]) => {
    setEditedAcademic({ ...editedAcademic, focusList: cur });
  };

  return (
    <Modal
      shouldShowModal={showModal}
      setShowModal={setShowModal}
      titleModal={titleModal}
    >
      <ModalItem
        title={"Titel"}
        keyValue={{ key: "title", value: editedAcademic.title }}
        onChangeItem={onChangeItem}
      />

      <ModalItem
        title={"Institution"}
        keyValue={{ key: "school", value: editedAcademic.school }}
        onChangeItem={onChangeItem}
      />

      <CustomDatePicker
        startDate={new Date(editedAcademic.from_date)}
        endDate={
          editedAcademic.to_date ? new Date(editedAcademic.to_date) : null
        }
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <ModalExperienceItems
        experiencePoints={editedAcademic.focusList}
        setExperiencepPoints={setExpPoints}
      />

      <SaveAndCancelButtons
        isSavingPossible={isSavingPossible}
        onSave={() => onSave(editedAcademic)}
        setShowModal={setShowModal}
      />
    </Modal>
  );
}

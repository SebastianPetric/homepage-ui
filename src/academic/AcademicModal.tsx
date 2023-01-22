import Modal from "../shared/modals/Modal";
import ModalItem from "../shared/modals/ModalItem";
import React, { useEffect, useState } from "react";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import CustomDatePicker, { format } from "../util/DateFormatter";
import { TKeyValue } from "../experiences/ExperienceSlice";
import { TAcademic } from "./AcademicSlice";
import { validateAcademicModalFieldsNotEmpty } from "../shared/modals/ModalFieldValidator";
import ModalExperienceItemsCareerAcademic from "../shared/modals/ModalExperienceItemsCareerAcademic";

export default function AcademicModal({
  titleModal,
  academic,
  showModal,
  setShowModal,
  onSaveAcademic,
}: {
  titleModal: string;
  academic: TAcademic;
  showModal: boolean;
  setShowModal: (shouldShow: boolean) => void;
  onSaveAcademic: (cur: TAcademic) => void;
}) {
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [editedAcademic, setEditedAcademic] = useState<TAcademic>(academic);

  useEffect(() => {
    validateAcademicModalFieldsNotEmpty(editedAcademic, setIsSavingPossible);
  }, [editedAcademic]);

  const onSave = (cur: TAcademic) => {
    setShowModal(false);
    onSaveAcademic(cur);
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

      <ModalExperienceItemsCareerAcademic
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

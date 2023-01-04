import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker, { format } from "../../util/DateFormatter";
import SaveAndCancelButtons from "./SaveAndCancelButtons";
import ModalItem from "./ModalItem";
import ModalExperienceItems from "./ModalExperienceItems";
import Modal from "./Modal";
import ModalCreateButton from "./ModalCreateButton";
import { GENERIC_DTO, TKeyValue } from "./EditStepModal";
import {
  addExperiencePoint,
  deleteExperiencePoint,
  editAndSetExperiencePoint,
} from "./ExperiencePointsInModalEditor";
import { validateAcademicCareerModalFieldsNotEmpty } from "./ModalFieldValidator";

export default function NewStepModal({
  isEditVisible,
  onSaveExp,
  titleModal,
}: {
  isEditVisible: boolean;
  onSaveExp: (obj: GENERIC_DTO) => void;
  titleModal: string;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [institution, setInstitution] = useState<string>("");
  const [formattedFromDate, setFormattedFromDate] = useState<string>("");
  const [formattedToDate, setFormattedToDate] = useState<string | undefined>(
    undefined
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [experiences, setExperiences] = useState<TKeyValue[]>([]);

  useEffect(() => {
    validateAcademicCareerModalFieldsNotEmpty(
      experiences,
      title,
      institution,
      formattedFromDate,
      setIsSavingPossible
    );
  }, [title, institution, experiences]);

  useEffect(() => {
    if (startDate) setFormattedFromDate(format(startDate));
    if (endDate) setFormattedToDate(format(endDate));
  }, [startDate, endDate]);

  const editExperiencePoint = (cur: TKeyValue) => {
    editAndSetExperiencePoint(cur, experiences, setExperiences);
  };

  const addNewExperiencePoint = () => {
    addExperiencePoint(experiences, setExperiences);
  };

  const onDeleteExperiencePoint = (cur: TKeyValue) => {
    deleteExperiencePoint(cur, experiences, setExperiences);
  };

  const onSave = () => {
    setShowModal(false);
    let tmp = [...experiences];
    let expArray: string[] = tmp
      .filter((exp) => exp.value !== "")
      .map((it) => it.value);

    let newObj: GENERIC_DTO = {
      title: title,
      institution: institution,
      from_date: formattedFromDate,
      to_date: formattedToDate,
      points: expArray,
    };
    onSaveExp(newObj);
  };

  return (
    <>
      <ModalCreateButton
        setShowModal={setShowModal}
        isEditVisible={isEditVisible}
      />
      <Modal
        shouldShowModal={showModal}
        setShowModal={setShowModal}
        titleModal={titleModal}
      >
        <ModalItem title={"Titel"} value={title} setValue={setTitle} />

        <ModalItem
          title={"Institution"}
          value={institution}
          setValue={setInstitution}
        />

        <CustomDatePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <ModalExperienceItems
          experiencePoints={experiences}
          addNewExperiencePoint={addNewExperiencePoint}
          editSingleExperiencePoint={editExperiencePoint}
          deleteSpecificExperiencePoint={onDeleteExperiencePoint}
        />
        <SaveAndCancelButtons
          isSavingPossible={isSavingPossible}
          onSave={onSave}
          setShowModal={setShowModal}
        />
      </Modal>
    </>
  );
}

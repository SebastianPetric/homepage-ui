import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker, { format } from "../../util/DateFormatter";
import SaveAndCancelButtons from "./SaveAndCancelButtons";
import ModalItem from "./ModalItem";
import ModalExperienceItems from "./ModalExperienceItems";
import Modal from "./Modal";
import ModalCreateButton from "./ModalCreateButton";
import { GENERIC_DTO, TKeyValue } from "./EditStepModal";

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
    let tmp = experiences.map((it) => it.value);

    if (
      title !== "" &&
      institution !== "" &&
      formattedFromDate !== "" &&
      tmp.length !== 0 &&
      !tmp.includes("")
    )
      setIsSavingPossible(true);
    else setIsSavingPossible(false);
  }, [title, institution, experiences]);

  useEffect(() => {
    if (startDate) setFormattedFromDate(format(startDate));
    if (endDate) setFormattedToDate(format(endDate));
  }, [startDate, endDate]);

  const editExperiencePoint = (cur: TKeyValue) => {
    let tmp = [...experiences];
    tmp.forEach((exp) => {
      if (exp.key === cur.key) {
        exp.value = cur.value;
      }
    });
    setExperiences(tmp);
  };

  const addNewExperiencePoint = () => {
    let newExp: TKeyValue = {
      key: `new-${Math.random() * 10}`,
      value: "",
    };
    let tmp = [...experiences, newExp];
    setExperiences(tmp);
  };

  const deleteExperiencePoint = (cur: TKeyValue) => {
    let tmp = experiences.filter((it) => it !== cur);
    setExperiences(tmp);
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
          deleteSpecificExperiencePoint={deleteExperiencePoint}
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

import React, { useEffect, useState } from "react";
import { FaMinus } from "react-icons/all";
import SaveAndCancelButtons from "./SaveAndCancelButtons";
import ModalItem from "./ModalItem";
import CustomDatePicker, { format } from "../../util/DateFormatter";
import ModalExperienceItems from "./ModalExperienceItems";
import Modal from "./Modal";
import ModalEditButton from "./ModalEditButton";

export type TKeyValue = {
  key: string;
  value: string;
};

export type GENERIC_DAO = {
  id: string;
  title: string;
  institution: string;
  from_date: string;
  to_date: string | undefined;
  points: string[];
};

export default function EditStepModal({
  titleModal,
  isEditVisible,
  onSaveExp,
  onDelete,
  id,
  editExpObj,
}: {
  onSaveExp: (obj: GENERIC_DAO) => void;
  onDelete: (id: string) => void;
  id: string;
  isEditVisible: boolean;
  editExpObj: GENERIC_DAO;
  titleModal: string;
}) {
  const [showModal, setShowModal] = useState<boolean>();
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(editExpObj.title);
  const [institution, setInstitution] = useState<string>(
    editExpObj.institution
  );
  const [formattedFromDate, setFormattedFromDate] = useState<string>(
    editExpObj.from_date
  );
  const [formattedToDate, setFormattedToDate] = useState<string | undefined>(
    editExpObj.to_date
  );

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(editExpObj.from_date)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    editExpObj.to_date ? new Date(editExpObj.to_date) : null
  );

  const [experiencePoints, setExperiencePoints] = useState<TKeyValue[]>([]);

  useEffect(() => {
    const tmp = editExpObj.points.map((it) => ({
      key: `new-${Math.random() * 10}`,
      value: it,
    }));
    setExperiencePoints(tmp);
  }, []);

  useEffect(() => {
    let tmp = experiencePoints.map((it) => it.value);
    if (
      title !== "" &&
      institution !== "" &&
      formattedFromDate !== "" &&
      tmp.length !== 0 &&
      !tmp.includes("")
    )
      setIsSavingPossible(true);
    else setIsSavingPossible(false);
  }, [title, institution, formattedFromDate, experiencePoints]);

  useEffect(() => {
    if (startDate) setFormattedFromDate(format(startDate));
    if (endDate) setFormattedToDate(format(endDate));
  }, [startDate, endDate]);

  const editSingleExperiencePoint = (cur: TKeyValue) => {
    let tmp = [...experiencePoints];
    tmp.forEach((exp) => {
      if (exp.key === cur.key) {
        exp.value = cur.value;
      }
    });
    setExperiencePoints(tmp);
  };

  const addNewExperiencePoint = () => {
    let newExp: TKeyValue = {
      key: `new-${Math.random() * 10}`,
      value: "",
    };
    let tmp = [...experiencePoints, newExp];
    setExperiencePoints(tmp);
  };

  const deleteSpecificExperiencePoint = (cur: TKeyValue) => {
    let tmp = experiencePoints.filter((it) => it !== cur);
    setExperiencePoints(tmp);
  };

  const onSave = () => {
    setShowModal(false);
    let tmp = [...experiencePoints];
    let expArray: string[] = tmp
      .filter((exp) => exp.value !== "")
      .map((it) => it.value);
    let newObj: GENERIC_DAO = {
      id: editExpObj.id,
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
      <ModalEditButton
        isEditVisible={isEditVisible}
        setShowModal={setShowModal}
      />
      {isEditVisible && (
        <FaMinus className={"deleteButton"} onClick={() => onDelete(id)} />
      )}
      {showModal ? (
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
            experiencePoints={experiencePoints}
            addNewExperiencePoint={addNewExperiencePoint}
            editSingleExperiencePoint={editSingleExperiencePoint}
            deleteSpecificExperiencePoint={deleteSpecificExperiencePoint}
          />
          <SaveAndCancelButtons
            isSavingPossible={isSavingPossible}
            onSave={onSave}
            setShowModal={setShowModal}
          />
        </Modal>
      ) : null}
    </>
  );
}

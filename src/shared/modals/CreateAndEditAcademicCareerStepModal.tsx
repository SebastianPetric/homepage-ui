import React, { useEffect, useState } from "react";
import { FaMinus } from "react-icons/all";
import SaveAndCancelButtons from "./SaveAndCancelButtons";
import ModalItem from "./ModalItem";
import CustomDatePicker, { format } from "../../util/DateFormatter";
import ModalExperienceItems from "./ModalExperienceItems";
import Modal from "./Modal";
import ModalEditButton from "./ModalEditButton";
import {
  addExperiencePoint,
  deleteExperiencePoint,
  editAndSetExperiencePoint,
} from "./ExperiencePointsInModalEditor";
import { validateAcademicCareerModalFieldsNotEmpty } from "./ModalFieldValidator";
import ModalCreateButton from "./ModalCreateButton";
import { useSelector } from "react-redux";

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

export type GENERIC_DTO = {
  title: string;

  institution: string;

  from_date: string;

  to_date: string | undefined;

  points: string[];
};

export default function CreateAndEditAcademicCareerStepModal({
  onSaveExp,
  titleModal,
  onDelete,
  id,
  editExpObj,
}: {
  onSaveExp: (obj: GENERIC_DAO) => void;
  onDelete?: (id: string) => void;
  id?: string;
  editExpObj?: GENERIC_DAO;
  titleModal: string;
}) {
  const [showModal, setShowModal] = useState<boolean>();
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(
    editExpObj ? editExpObj.title : ""
  );
  const [institution, setInstitution] = useState<string>(
    editExpObj ? editExpObj.institution : ""
  );
  const [formattedFromDate, setFormattedFromDate] = useState<string>(
    editExpObj ? editExpObj.from_date : ""
  );
  const [formattedToDate, setFormattedToDate] = useState<string | undefined>(
    editExpObj ? editExpObj.to_date : ""
  );

  const [startDate, setStartDate] = useState<Date | null>(
    editExpObj ? new Date(editExpObj.from_date) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    editExpObj && editExpObj.to_date ? new Date(editExpObj.to_date) : null
  );

  const [experiencePoints, setExperiencePoints] = useState<TKeyValue[]>([]);

  const isLoggedIn: boolean = useSelector((state: any) => {
    return state.authentication.isAuthenticated;
  });

  useEffect(() => {
    if (editExpObj) {
      const tmp = editExpObj.points.map((it) => ({
        key: `new-${Math.random() * 10}`,
        value: it,
      }));
      setExperiencePoints(tmp);
    }
  }, []);

  useEffect(() => {
    validateAcademicCareerModalFieldsNotEmpty(
      experiencePoints,
      title,
      institution,
      formattedFromDate,
      setIsSavingPossible
    );
  }, [title, institution, formattedFromDate, experiencePoints]);

  useEffect(() => {
    if (startDate) setFormattedFromDate(format(startDate));
    if (endDate) setFormattedToDate(format(endDate));
  }, [startDate, endDate]);

  const editSingleExperiencePoint = (cur: TKeyValue) => {
    editAndSetExperiencePoint(cur, experiencePoints, setExperiencePoints);
  };

  const addNewExperiencePoint = () => {
    addExperiencePoint(experiencePoints, setExperiencePoints);
  };

  const deleteSpecificExperiencePoint = (cur: TKeyValue) => {
    deleteExperiencePoint(cur, experiencePoints, setExperiencePoints);
  };

  const onSave = () => {
    setShowModal(false);
    let tmp = [...experiencePoints];
    let expArray: string[] = tmp
      .filter((exp) => exp.value !== "")
      .map((it) => it.value);
    let newObj: GENERIC_DAO = {
      id: editExpObj ? editExpObj?.id : "",
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
      {editExpObj ? (
        <>
          <ModalEditButton setShowModal={setShowModal} />
          {isLoggedIn && (
            <FaMinus
              className={"deleteButton"}
              onClick={() => {
                if (onDelete && id) onDelete(id);
              }}
            />
          )}
        </>
      ) : (
        <ModalCreateButton setShowModal={setShowModal} />
      )}

      {showModal ? (
        <Modal
          shouldShowModal={showModal}
          setShowModal={setShowModal}
          titleModal={titleModal}
        >
          <ModalItem
            title={"Titel"}
            keyValue={{ key: "title", value: title }}
          />

          <ModalItem
            title={"Institution"}
            keyValue={{ key: "institution", value: institution }}
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

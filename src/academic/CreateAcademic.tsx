import ModalCreateButton from "../shared/modals/ModalCreateButton";
import React, { useState } from "react";
import AcademicModal from "./AcademicModal";
import { format } from "../util/DateFormatter";
import { useAppDispatch } from "../hooks/hooks";
import { saveAcademicStep, TAcademic } from "./AcademicSlice";

export default function CreateAcademic() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const saveNewCareer = (cur: TAcademic) => {
    dispatch(
      saveAcademicStep({
        title: cur.title,
        school: cur.school,
        to_date: cur.to_date,
        focusList: cur.focusList,
        from_date: cur.from_date,
      })
    );
  };

  return (
    <>
      <ModalCreateButton setShowModal={setShowModal} />
      <AcademicModal
        titleModal={"Schulischen Werdegang hinzufügen"}
        academic={{
          id: "",
          title: "",
          school: "",
          from_date: format(new Date()),
          to_date: format(new Date()),
          focusList: [],
        }}
        showModal={showModal}
        setShowModal={setShowModal}
        onSaveAcademic={saveNewCareer}
      />
    </>
  );
}

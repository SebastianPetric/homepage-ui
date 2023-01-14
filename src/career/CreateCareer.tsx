import ModalCreateButton from "../shared/modals/ModalCreateButton";
import React, { useState } from "react";
import CareerModal from "./CareerModal";
import { format } from "../util/DateFormatter";
import { useAppDispatch } from "../hooks/hooks";
import { saveCareerStep, TCareer } from "./CareerSlice";

export default function CreateCareer() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const saveNewCareer = (cur: TCareer) => {
    dispatch(
      saveCareerStep({
        title: cur.title,
        company: cur.company,
        to_date: cur.to_date,
        toDos: cur.toDos,
        from_date: cur.from_date,
      })
    );
  };

  return (
    <>
      <ModalCreateButton setShowModal={setShowModal} />
      <CareerModal
        titleModal={"Neuer Karriereschritt"}
        career={{
          id: "",
          title: "",
          company: "",
          from_date: format(new Date()),
          to_date: undefined,
          toDos: [],
        }}
        showModal={showModal}
        setShowModal={setShowModal}
        onSaveCareer={saveNewCareer}
      />
    </>
  );
}

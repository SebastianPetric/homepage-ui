import ModalCreateButton from "../shared/modals/ModalCreateButton";
import React, { useState } from "react";
import ExperienceModal from "./ExperienceModal";

export default function CreateExperience() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <ModalCreateButton setShowModal={setShowModal} />
      <ExperienceModal
        showModal={showModal}
        setShowModal={setShowModal}
        experience={{
          title: "",
          experiencePoints: [],
        }}
      />
    </>
  );
}

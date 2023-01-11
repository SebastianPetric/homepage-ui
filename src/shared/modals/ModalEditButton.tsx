import React from "react";
import { FaEdit } from "react-icons/all";

export default function ModalEditButton({
  setShowModal,
  isEditVisible,
}: {
  setShowModal: (shouldShowModal: boolean) => void;
  isEditVisible: boolean;
}) {
  return (
    <>
      {isEditVisible ? (
        <FaEdit
          className={"hover:text-accentColor cursor-pointer mb-2"}
          onClick={() => setShowModal(true)}
        />
      ) : undefined}
    </>
  );
}

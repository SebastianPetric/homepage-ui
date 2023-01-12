import React from "react";
import { FaEdit } from "react-icons/all";
import { useSelector } from "react-redux";

export default function ModalEditButton({
  setShowModal,
}: {
  setShowModal: (shouldShowModal: boolean) => void;
}) {
  const isLoggedIn: boolean = useSelector((state: any) => {
    return state.authentication.isAuthenticated;
  });

  return (
    <>
      {isLoggedIn ? (
        <FaEdit
          className={"hover:text-accentColor cursor-pointer mb-2"}
          onClick={() => setShowModal(true)}
        />
      ) : undefined}
    </>
  );
}

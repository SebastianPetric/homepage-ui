import React from "react";
import { FaEdit } from "react-icons/all";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

export default function ModalEditButton({
  setShowModal,
}: {
  setShowModal: (shouldShowModal: boolean) => void;
}) {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <FaEdit
          className={"hover:text-accentColor cursor-pointer mb-2"}
          onClick={() => setShowModal(true)}
        />
      ) : undefined}
    </>
  );
}

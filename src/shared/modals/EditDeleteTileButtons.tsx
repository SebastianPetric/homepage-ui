import ModalEditButton from "./ModalEditButton";
import { FaMinus } from "react-icons/all";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function EditDeleteTileButtons({
  setShowModal,
  onDelete,
}: {
  setShowModal: (shouldShow: boolean) => void;
  onDelete: () => void;
}) {
  const { isAuthenticated } = useAuth0();

  return (
    <div className={"flex flex-row"}>
      <ModalEditButton setShowModal={setShowModal} />
      {isAuthenticated && (
        <FaMinus className={"deleteButton"} onClick={onDelete} />
      )}
    </div>
  );
}

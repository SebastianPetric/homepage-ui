import ModalEditButton from "./ModalEditButton";
import { FaMinus } from "react-icons/all";
import React from "react";
import { useSelector } from "react-redux";

export default function EditDeleteTileButtons({
  setShowModal,
  onDelete,
}: {
  setShowModal: (shouldShow: boolean) => void;
  onDelete: () => void;
}) {
  const isLoggedIn: boolean = useSelector((state: any) => {
    return state.authentication.isAuthenticated;
  });

  return (
    <div className={"flex flex-row"}>
      <ModalEditButton setShowModal={setShowModal} />
      {isLoggedIn && <FaMinus className={"deleteButton"} onClick={onDelete} />}
    </div>
  );
}

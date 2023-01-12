import React, { useEffect, useState } from "react";
import { TUserInfo } from "./InfoTab";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import ModalItem from "../shared/modals/ModalItem";
import Modal from "../shared/modals/Modal";
import ModalEditButton from "../shared/modals/ModalEditButton";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import reducers from "../reducers/Reducers";
import { editUserInfo } from "./UserSlice";

export default function EditInfoModal({
  isEditActive,
}: {
  isEditActive: boolean;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);

  const dispatch =
    useDispatch<ThunkDispatch<ReturnType<typeof reducers>, any, AnyAction>>();

  const { info }: { info: TUserInfo } = useSelector((state: any) => {
    return state.user;
  });

  useEffect(() => {
    if (
      info.first_name === "" ||
      info.last_name === "" ||
      info.phone === "" ||
      info.email == "" ||
      info.github_link === "" ||
      info.linkedin_link === "" ||
      info.xing_link === ""
    )
      setIsSavingPossible(false);
    else setIsSavingPossible(true);
  }, [
    info.first_name,
    info.last_name,
    info.phone,
    info.email,
    info.github_link,
    info.linkedin_link,
    info.xing_link,
  ]);

  const onSave = () => {
    setShowModal(false);
    dispatch(editUserInfo({ ...info }));
  };

  return (
    <>
      <ModalEditButton
        isEditVisible={isEditActive}
        setShowModal={setShowModal}
      />
      <Modal
        shouldShowModal={showModal}
        titleModal={"Bearbeiten"}
        setShowModal={setShowModal}
      >
        <ModalItem
          title={"Vorname"}
          keyValue={{ key: "first_name", value: info.first_name }}
        />
        <ModalItem
          title={"Nachname"}
          keyValue={{ key: "last_name", value: info.last_name }}
        />
        <ModalItem
          title={"Mobilfung"}
          keyValue={{ key: "phone", value: info.phone }}
        />
        <ModalItem
          title={"Email"}
          keyValue={{ key: "email", value: info.email }}
        />
        <ModalItem
          title={"Github"}
          keyValue={{ key: "github_link", value: info.github_link }}
        />
        <ModalItem
          title={"LinkedIn"}
          keyValue={{ key: "linkedin_link", value: info.linkedin_link }}
        />
        <ModalItem
          title={"Xing"}
          keyValue={{ key: "xing_link", value: info.xing_link }}
        />
        <SaveAndCancelButtons
          isSavingPossible={isSavingPossible}
          onSave={onSave}
          setShowModal={setShowModal}
        />
      </Modal>
    </>
  );
}

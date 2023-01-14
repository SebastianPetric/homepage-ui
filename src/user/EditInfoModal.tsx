import React, { useEffect, useState } from "react";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import ModalItem from "../shared/modals/ModalItem";
import Modal from "../shared/modals/Modal";
import ModalEditButton from "../shared/modals/ModalEditButton";
import { editUserInfo, TUserInfo, update } from "./UserSlice";
import { TKeyValue } from "../experiences/ExperienceSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/Store";
import { validateUserInfoModalFieldsNotEmpty } from "../shared/modals/ModalFieldValidator";

export default function EditInfoModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const userInfo: TUserInfo = useAppSelector(
    (state: RootState) => state.user.info
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    validateUserInfoModalFieldsNotEmpty(userInfo, setIsSavingPossible);
  }, [userInfo]);

  const onChangeItem = (cur: TKeyValue) => {
    dispatch(update(cur));
  };

  const onSave = () => {
    setShowModal(false);
    dispatch(editUserInfo(userInfo));
  };

  return (
    <>
      <ModalEditButton setShowModal={setShowModal} />
      <Modal
        shouldShowModal={showModal}
        titleModal={"Bearbeiten"}
        setShowModal={setShowModal}
      >
        <ModalItem
          title={"Vorname"}
          keyValue={{ key: "first_name", value: userInfo.first_name }}
          onChangeItem={onChangeItem}
        />
        <ModalItem
          title={"Nachname"}
          keyValue={{ key: "last_name", value: userInfo.last_name }}
          onChangeItem={onChangeItem}
        />
        <ModalItem
          title={"Mobilfung"}
          keyValue={{ key: "phone", value: userInfo.phone }}
          onChangeItem={onChangeItem}
        />
        <ModalItem
          title={"Email"}
          keyValue={{ key: "email", value: userInfo.email }}
          onChangeItem={onChangeItem}
        />
        <ModalItem
          title={"Github"}
          keyValue={{ key: "github_link", value: userInfo.github_link }}
          onChangeItem={onChangeItem}
        />
        <ModalItem
          title={"LinkedIn"}
          keyValue={{ key: "linkedin_link", value: userInfo.linkedin_link }}
          onChangeItem={onChangeItem}
        />
        <ModalItem
          title={"Xing"}
          keyValue={{ key: "xing_link", value: userInfo.xing_link }}
          onChangeItem={onChangeItem}
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

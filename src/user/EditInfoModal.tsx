import React, { useEffect, useState } from "react";
import { TUserInfo } from "./InfoTab";
import SaveAndCancelButtons from "../shared/modals/SaveAndCancelButtons";
import ModalItem from "../shared/modals/ModalItem";
import Modal from "../shared/modals/Modal";
import ModalEditButton from "../shared/modals/ModalEditButton";

export default function EditInfoModal({
  onSaveUserInfo,
  editUserInfoObj,
  isEditActive,
}: {
  onSaveUserInfo: (obj: TUserInfo) => void;
  editUserInfoObj: TUserInfo;
  isEditActive: boolean;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>(
    editUserInfoObj.first_name
  );
  const [lastName, setLastName] = useState<string>(editUserInfoObj.last_name);
  const [phone, setPhone] = useState<string>(editUserInfoObj.phone);
  const [email, setEmail] = useState<string>(editUserInfoObj.email);
  const [github, setGithub] = useState<string>(editUserInfoObj.github_link);
  const [linkedin, setLinkedIn] = useState<string>(
    editUserInfoObj.linkedin_link
  );
  const [xing, setXing] = useState<string>(editUserInfoObj.xing_link);

  useEffect(() => {
    if (
      firstName === "" ||
      lastName === "" ||
      phone === "" ||
      email == "" ||
      github === "" ||
      linkedin === "" ||
      xing === ""
    )
      setIsSavingPossible(false);
    else setIsSavingPossible(true);
  }, [firstName, lastName, phone, email, github, linkedin, xing]);

  const onSave = () => {
    const edited: TUserInfo = { ...editUserInfoObj };
    edited.first_name = firstName;
    edited.last_name = lastName;
    edited.phone = phone;
    edited.email = email;
    edited.github_link = github;
    edited.linkedin_link = linkedin;
    edited.xing_link = xing;
    setShowModal(false);
    onSaveUserInfo(edited);
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
          value={firstName}
          setValue={setFirstName}
        />
        <ModalItem title={"Nachname"} value={lastName} setValue={setLastName} />
        <ModalItem title={"Mobilfung"} value={phone} setValue={setPhone} />
        <ModalItem title={"Email"} value={email} setValue={setEmail} />
        <ModalItem title={"Github"} value={github} setValue={setGithub} />
        <ModalItem title={"LinkedIn"} value={linkedin} setValue={setLinkedIn} />
        <ModalItem title={"Xing"} value={xing} setValue={setXing} />
        <SaveAndCancelButtons
          isSavingPossible={isSavingPossible}
          onSave={onSave}
          setShowModal={setShowModal}
        />
      </Modal>
    </>
  );
}

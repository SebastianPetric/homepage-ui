import CareerModal from "./CareerModal";
import React from "react";
import { useAppDispatch } from "../hooks/hooks";
import { TCareer, updateCareerStep } from "./CareerSlice";

export default function EditCareer({
  career,
  showMdl,
  setShowMdl,
}: {
  career: TCareer;
  showMdl: boolean;
  setShowMdl: (shouldShow: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const updateCareer = (cur: TCareer) => {
    dispatch(updateCareerStep(cur));
  };

  return (
    <>
      <CareerModal
        titleModal={"Karriereschritt bearbeiten"}
        career={career}
        showModal={showMdl}
        setShowModal={setShowMdl}
        onSaveCareer={updateCareer}
      />
    </>
  );
}

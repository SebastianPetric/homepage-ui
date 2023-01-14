import AcademicModal from "./AcademicModal";
import React from "react";
import { useAppDispatch } from "../hooks/hooks";
import { TAcademic, updateAcademicStep } from "./AcademicSlice";

export default function EditAcademic({
  academic,
  showMdl,
  setShowMdl,
}: {
  academic: TAcademic;
  showMdl: boolean;
  setShowMdl: (shouldShow: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const updateCareer = (cur: TAcademic) => {
    dispatch(updateAcademicStep(cur));
  };

  return (
    <>
      <AcademicModal
        titleModal={"Schulischen Werdegang bearbeiten"}
        academic={academic}
        showModal={showMdl}
        setShowModal={setShowMdl}
        onSaveAcademic={updateCareer}
      />
    </>
  );
}

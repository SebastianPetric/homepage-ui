import React from "react";
import ExperienceModal from "./ExperienceModal";
import { TExperience } from "./ExperienceSlice";

export default function EditExperience({
  exp,
  showMdl,
  setShowMdl,
}: {
  exp: TExperience;
  showMdl: boolean;
  setShowMdl: (shouldShow: boolean) => void;
}) {
  return (
    <ExperienceModal
      showModal={showMdl}
      setShowModal={setShowMdl}
      experience={exp}
    />
  );
}

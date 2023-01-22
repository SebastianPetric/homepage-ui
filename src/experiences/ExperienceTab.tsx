import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import {
  deleteExperience,
  TExperience,
  TExperiencePoint,
} from "./ExperienceSlice";
import EditExperience from "./EditExperience";
import EditDeleteTileButtons from "../shared/modals/EditDeleteTileButtons";
import ExperienceIcons from "./ExperienceIcons";

export default function ExperienceTab({ exp }: { exp: TExperience }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onDelete = (cur: TExperience) => {
    dispatch(deleteExperience(cur));
  };

  return (
    <div className={"tab"}>
      <EditDeleteTileButtons
        setShowModal={setShowModal}
        onDelete={() => onDelete(exp)}
      />
      <EditExperience exp={exp} showMdl={showModal} setShowMdl={setShowModal} />
      <p className={"text-accentColor text-xl font-bold mb-2"}>{exp.title}</p>
      <ul>
        {exp.experiencePoints.map((ex: TExperiencePoint, idx: number) => (
          <li
            key={idx}
            className={
              "flex flex-row items-center justify-between text-sm mt-2 h-full"
            }
          >
            {ex.name}
            {ex.yearsOfExperience !== 0 && (
              <ExperienceIcons
                years={ex.yearsOfExperience}
                grade={ex.gradeOfExperience}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

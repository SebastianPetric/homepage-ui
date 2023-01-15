import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { deleteExperience, TExperience } from "./ExperienceSlice";
import EditExperience from "./EditExperience";
import EditDeleteTileButtons from "../shared/modals/EditDeleteTileButtons";

export default function ExperienceTab({ exp }: { exp: TExperience }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onDelete = (cur: TExperience) => {
    dispatch(deleteExperience(cur));
  };

  return (
    <div className={"flex flex-col w-80 mt-10 tab"}>
      <EditDeleteTileButtons
        setShowModal={setShowModal}
        onDelete={() => onDelete(exp)}
      />
      <EditExperience exp={exp} showMdl={showModal} setShowMdl={setShowModal} />
      <p className={"text-accentColor text-xl font-bold mb-2"}>{exp.title}</p>
      <ul>
        {exp.experiencePoints.map((ex: string, idx: number) => (
          <li key={idx} className={"font-bold"}>
            {ex}
          </li>
        ))}
      </ul>
    </div>
  );
}

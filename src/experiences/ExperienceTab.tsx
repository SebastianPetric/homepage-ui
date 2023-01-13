import { FaMinus } from "react-icons/all";
import React, { useState } from "react";
import ModalEditButton from "../shared/modals/ModalEditButton";
import { useAppDispatch } from "../hooks/hooks";
import { deleteExperience } from "./ExperienceSlice";
import EditExperience from "./EditExperience";
import { TExperience } from "../shared/modals/ExperiencePointsInModalEditor";

export default function ExperienceTab({ exp }: { exp: TExperience }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onDelete = (cur: TExperience) => {
    dispatch(deleteExperience(cur));
  };

  return (
    <div className={"flex flex-col w-80 mt-10"}>
      <div className={"flex flex-row"}>
        <ModalEditButton setShowModal={setShowModal} />
        <EditExperience
          exp={exp}
          showMdl={showModal}
          setShowMdl={setShowModal}
        />
        <FaMinus className={"deleteButton"} onClick={() => onDelete(exp)} />
      </div>
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

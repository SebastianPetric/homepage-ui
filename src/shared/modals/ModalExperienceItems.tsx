import { FaMinus, FaPlus } from "react-icons/all";
import React from "react";
import { TIndexValue } from "./ExperiencePointsInModalEditor";

export default function ModalExperienceItems({
  experiencePoints,
  addNewExperiencePoint,
  editSingleExperiencePoint,
  deleteSpecificExperiencePoint,
}: {
  experiencePoints: string[];
  addNewExperiencePoint: (cur: string) => void;
  editSingleExperiencePoint: (cur: TIndexValue) => void;
  deleteSpecificExperiencePoint: (index: number) => void;
}) {
  return (
    <>
      <div className={"flex flex-row items-center mt-5 font-bold"}>
        <p>Erfahrungen:</p>
        <FaPlus
          className={"ml-5 hover:text-textColor cursor-pointer"}
          onClick={() => addNewExperiencePoint("")}
        />
      </div>
      {experiencePoints.map((exp, index) => (
        <div key={index} className={"flex flex-row items-center"}>
          <input
            className={"border-2 w-full mt-2 mb-2"}
            value={exp}
            onChange={(event) =>
              editSingleExperiencePoint({
                index,
                value: event.target.value,
              })
            }
          ></input>
          <FaMinus
            className={"deleteButton"}
            onClick={() => deleteSpecificExperiencePoint(index)}
          />
        </div>
      ))}
    </>
  );
}

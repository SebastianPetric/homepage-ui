import { FaMinus, FaPlus } from "react-icons/all";
import React from "react";
import { TKeyValue } from "./EditStepModal";

export default function ModalExperienceItems({
  experiencePoints,
  addNewExperiencePoint,
  editSingleExperiencePoint,
  deleteSpecificExperiencePoint,
}: {
  experiencePoints: TKeyValue[];
  addNewExperiencePoint: () => void;
  editSingleExperiencePoint: (cur: TKeyValue) => void;
  deleteSpecificExperiencePoint: (cur: TKeyValue) => void;
}) {
  return (
    <>
      <div className={"flex flex-row items-center mt-5 font-bold"}>
        <p>Erfahrungen:</p>
        <FaPlus
          className={"ml-5 hover:text-green-600 cursor-pointer"}
          onClick={addNewExperiencePoint}
        />
      </div>
      {experiencePoints.map((exp, index) => (
        <div key={`${exp}-${index}`} className={"flex flex-row items-center"}>
          <input
            className={"border-2 w-full mt-2 mb-2"}
            value={exp.value}
            onChange={(event) =>
              editSingleExperiencePoint({
                key: exp.key,
                value: event.target.value,
              })
            }
          ></input>
          <FaMinus
            className={"deleteButton"}
            onClick={() => deleteSpecificExperiencePoint(exp)}
          />
        </div>
      ))}
    </>
  );
}

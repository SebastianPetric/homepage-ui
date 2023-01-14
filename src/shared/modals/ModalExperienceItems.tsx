import { FaMinus, FaPlus } from "react-icons/all";
import React from "react";
import { TIndexValue } from "../../experiences/ExperienceSlice";

export default function ModalExperienceItems({
  experiencePoints,
  setExperiencepPoints,
}: {
  experiencePoints: string[];
  setExperiencepPoints: (cur: string[]) => void;
}) {
  const onAddNewExperiencePoint = (cur: string) => {
    setExperiencepPoints([...experiencePoints, cur]);
  };

  const onEditSingleExperiencePoint = (cur: TIndexValue) => {
    let tmp = [...experiencePoints];
    tmp[cur.index] = cur.value;
    setExperiencepPoints(tmp);
  };

  const onDeleteSpecificExperiencePoint = (index: number) => {
    let tmp = [...experiencePoints];
    tmp = tmp.filter((it: string) => it !== tmp[index]);
    setExperiencepPoints(tmp);
  };

  return (
    <>
      <div className={"flex flex-row items-center mt-5 font-bold"}>
        <p>Erfahrungen:</p>
        <FaPlus
          className={"ml-5 hover:text-textColor cursor-pointer"}
          onClick={() => onAddNewExperiencePoint("")}
        />
      </div>
      {experiencePoints.map((exp, index) => (
        <div key={index} className={"flex flex-row items-center"}>
          <input
            className={"border-2 w-full mt-2 mb-2"}
            value={exp}
            onChange={(event) =>
              onEditSingleExperiencePoint({
                index,
                value: event.target.value,
              })
            }
          ></input>
          <FaMinus
            className={"deleteButton"}
            onClick={() => onDeleteSpecificExperiencePoint(index)}
          />
        </div>
      ))}
    </>
  );
}

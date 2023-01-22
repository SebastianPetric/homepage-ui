import { FaMinus, FaPlus } from "react-icons/all";
import React from "react";
import {
  EXPERIENCE_GRADE,
  TExperiencePoint,
  TIndexExperienceGrade,
  TIndexValue,
} from "../../experiences/ExperienceSlice";
import ExperienceGradeDropdown from "../../experiences/ExperienceGradeDropdown";

export default function ModalExperienceItems({
  experiencePoints,
  setExperiencepPoints,
}: {
  experiencePoints: TExperiencePoint[];
  setExperiencepPoints: (cur: TExperiencePoint[]) => void;
}) {
  const onAddNewExperiencePoint = (cur: TExperiencePoint) => {
    setExperiencepPoints([...experiencePoints, cur]);
  };

  const onEditSingleExperiencePoint = (cur: TIndexValue) => {
    let tmp = JSON.parse(JSON.stringify(experiencePoints));
    tmp[cur.index].name = cur.value;
    setExperiencepPoints(tmp);
  };

  const onEditSingleExperienceYearPoint = (cur: TIndexExperienceGrade) => {
    let tmp = JSON.parse(JSON.stringify(experiencePoints));
    if (cur.grade) tmp[cur.index].gradeOfExperience = cur.grade;
    if (cur.years !== undefined) tmp[cur.index].yearsOfExperience = cur.years;
    setExperiencepPoints(tmp);
  };

  const onEditSingleExperienceGradePoint = (
    idx: number,
    cur: EXPERIENCE_GRADE
  ) => {
    let tmp = JSON.parse(JSON.stringify(experiencePoints));
    tmp[idx].gradeOfExperience = cur;
    setExperiencepPoints(tmp);
  };

  const onDeleteSpecificExperiencePoint = (index: number) => {
    let tmp = JSON.parse(JSON.stringify(experiencePoints));
    tmp = tmp.filter((it: TExperiencePoint) => it !== tmp[index]);
    setExperiencepPoints(tmp);
  };

  return (
    <>
      <div className={"flex flex-row items-center mt-5 font-bold"}>
        <p>Erfahrungen:</p>
        <FaPlus
          className={"ml-5 hover:text-textColor cursor-pointer"}
          onClick={() =>
            onAddNewExperiencePoint({
              name: "",
              yearsOfExperience: 0,
              gradeOfExperience: EXPERIENCE_GRADE.BEGINNER,
            })
          }
        />
      </div>
      {experiencePoints.map((exp: TExperiencePoint, index) => (
        <div key={index} className={"flex flex-row items-center"}>
          <input
            className={"border-2 w-full mt-2 mb-2"}
            value={exp.name}
            onChange={(event) =>
              onEditSingleExperiencePoint({
                index,
                value: event.target.value,
              })
            }
          ></input>
          <input
            className={"border-2 w-20 my-2 mx-2 pl-2"}
            placeholder={"Jahre"}
            type={"number"}
            pattern={"[0-9]+"}
            value={exp.yearsOfExperience}
            onChange={(event) =>
              onEditSingleExperienceYearPoint({
                index,
                years: Number(event.target.value),
              })
            }
          ></input>
          <p>Jahre</p>
          <ExperienceGradeDropdown
            index={index}
            experiencePoint={exp}
            setExperienceGrade={onEditSingleExperienceGradePoint}
          />
          <FaMinus
            className={"deleteButton"}
            onClick={() => onDeleteSpecificExperiencePoint(index)}
          />
        </div>
      ))}
    </>
  );
}

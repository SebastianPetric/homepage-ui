import { EXPERIENCE_GRADE } from "./ExperienceSlice";
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/all";
import React from "react";

export default function ExperienceIcons({
  years,
  grade,
}: {
  years: number;
  grade: EXPERIENCE_GRADE;
}) {
  const getStars = (num: number) => {
    const emptyStarsNum = 4 - num;
    return (
      <div className={"flex flex-row ml-2"}>
        {[...Array(num)].map((it, idx) => (
          <BiRadioCircleMarked key={idx} className={"mx-1"} />
        ))}
        {[...Array(emptyStarsNum)].map((it, idx) => (
          <BiRadioCircle key={idx} className={"mx-1"} />
        ))}
      </div>
    );
  };

  return (
    <div className={"flex flex-row"}>
      {grade === EXPERIENCE_GRADE.TOTAL_BEGINNER ? (
        <>{getStars(1)}</>
      ) : grade === EXPERIENCE_GRADE.BEGINNER ? (
        <>{getStars(2)}</>
      ) : grade === EXPERIENCE_GRADE.INTERMEDIATE ? (
        <>{getStars(3)}</>
      ) : grade === EXPERIENCE_GRADE.PROFESSIONAL ? (
        <>{getStars(4)}</>
      ) : (
        <></>
      )}
    </div>
  );
}

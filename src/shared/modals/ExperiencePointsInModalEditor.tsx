import { TKeyValue } from "./EditAcademicCareerStepModal";

export const editAndSetExperiencePoint = (
  cur: TKeyValue,
  experiencePoints: TKeyValue[],
  setExperiencePoints: (exps: TKeyValue[]) => void
) => {
  let tmp = [...experiencePoints];
  tmp.forEach((exp) => {
    if (exp.key === cur.key) {
      exp.value = cur.value;
    }
  });
  setExperiencePoints(tmp);
};

export const addExperiencePoint = (
  experiences: TKeyValue[],
  setExperiences: (cur: TKeyValue[]) => void
) => {
  let newExp: TKeyValue = {
    key: `new-${Math.random() * 10}`,
    value: "",
  };
  let tmp = [...experiences, newExp];
  setExperiences(tmp);
};

export const deleteExperiencePoint = (
  cur: TKeyValue,
  experiencePoints: TKeyValue[],
  setExperiencePoints: (cur: TKeyValue[]) => void
) => {
  let tmp = experiencePoints.filter((it) => it !== cur);
  setExperiencePoints(tmp);
};

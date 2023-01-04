import { TKeyValue } from "./EditStepModal";

export const validateAcademicCareerModalFieldsNotEmpty = (
  experiences: TKeyValue[],
  title: string,
  institution: string,
  formattedFromDate: string,
  setIsSavingPossible: (isPossible: boolean) => void
) => {
  let tmp = experiences.map((it) => it.value);

  if (
    title !== "" &&
    institution !== "" &&
    formattedFromDate !== "" &&
    tmp.length !== 0 &&
    !tmp.includes("")
  )
    setIsSavingPossible(true);
  else setIsSavingPossible(false);
};

export const validateExperienceModalFieldsNotEmpty = (
  experiencePoints: TKeyValue[],
  title: string,
  setIsSavingPossible: (isPossible: boolean) => void
) => {
  let tmp = experiencePoints.map((it) => it.value);
  if (title !== "" && tmp.length !== 0 && !tmp.includes(""))
    setIsSavingPossible(true);
  else setIsSavingPossible(false);
};

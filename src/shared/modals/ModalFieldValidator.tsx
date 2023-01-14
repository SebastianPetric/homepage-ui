export const validateExperienceModalFieldsNotEmpty = (
  experiencePoints: string[],
  title: string,
  setIsSavingPossible: (isPossible: boolean) => void
) => {
  let tmp = experiencePoints.map((it) => it);
  if (title !== "" && tmp.length !== 0 && !tmp.includes(""))
    setIsSavingPossible(true);
  else setIsSavingPossible(false);
};

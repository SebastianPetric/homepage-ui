import { TUserInfo } from "../../user/UserSlice";
import { TCareer } from "../../career/CareerSlice";
import { TAcademic } from "../../academic/AcademicSlice";
import { TExperiencePoint } from "../../experiences/ExperienceSlice";

export const validateExperienceModalFieldsNotEmpty = (
  experiencePoints: TExperiencePoint[],
  title: string,
  setIsSavingPossible: (isPossible: boolean) => void
) => {
  let tmp = experiencePoints.map((it) => it);
  if (title !== "" && tmp.length !== 0)
    experiencePoints.forEach((it) =>
      it.name !== "" ? setIsSavingPossible(true) : setIsSavingPossible(false)
    );
  else setIsSavingPossible(false);
};

export const validateUserInfoModalFieldsNotEmpty = (
  userInfo: TUserInfo,
  setIsSavingPossible: (isPossible: boolean) => void
) => {
  if (
    userInfo.first_name === "" ||
    userInfo.last_name === "" ||
    userInfo.phone === "" ||
    userInfo.email == "" ||
    userInfo.github_link === "" ||
    userInfo.linkedin_link === "" ||
    userInfo.xing_link === ""
  )
    setIsSavingPossible(false);
  else setIsSavingPossible(true);
};

export const validateCareerModalFieldsNotEmpty = (
  editedCareer: TCareer,
  setIsSavingPossible: (isPossible: boolean) => void
) => {
  if (
    editedCareer.title === "" ||
    editedCareer.company === "" ||
    editedCareer.from_date == undefined ||
    editedCareer.toDos.length === 0 ||
    editedCareer.toDos.find((it) => it === "") !== undefined
  )
    setIsSavingPossible(false);
  else setIsSavingPossible(true);
};

export const validateAcademicModalFieldsNotEmpty = (
  editedCareer: TAcademic,
  setIsSavingPossible: (isPossible: boolean) => void
) => {
  if (
    editedCareer.title === "" ||
    editedCareer.school === "" ||
    editedCareer.from_date == undefined ||
    editedCareer.focusList.length === 0 ||
    editedCareer.focusList.find((it) => it === "") !== undefined
  )
    setIsSavingPossible(false);
  else setIsSavingPossible(true);
};

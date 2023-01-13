export type TExperience = {
  id?: string;
  title: string;
  experiencePoints: string[];
};

export type TExperienceDTO = {
  title: string;
  experiencePoints: string[];
};

export type TKeyValue = {
  key: string;
  value: string;
};

export type TIndexValue = {
  index: number;
  value: string;
};

export const addNewExperiencePoint = (
  experience: TExperience,
  setExperience: (ex: TExperience) => void,
  cur: string
) => {
  let tmp = [...experience.experiencePoints];
  tmp.push(cur);
  setExperience({ ...experience, experiencePoints: tmp });
};

export const editSingleExperiencePoint = (
  experience: TExperience,
  setExperience: (ex: TExperience) => void,
  cur: TIndexValue
) => {
  let tmp = [...experience.experiencePoints];
  tmp[cur.index] = cur.value;
  setExperience({ ...experience, experiencePoints: tmp });
};

export const deleteSpecificExperiencePoint = (
  experience: TExperience,
  setExperience: (ex: TExperience) => void,
  index: number
) => {
  let copy = { ...experience };
  copy.experiencePoints = copy.experiencePoints.filter(
    (it: string) => it !== copy.experiencePoints[index]
  );
  setExperience(copy);
};

export const onChangeExperiencePointItem = (
  experience: TExperience,
  setExperience: (ex: TExperience) => void,
  cur: TKeyValue
) => {
  let tmp = { ...experience, [cur.key]: cur.value };
  setExperience(tmp);
};

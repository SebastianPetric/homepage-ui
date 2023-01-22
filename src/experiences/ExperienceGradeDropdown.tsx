import { EXPERIENCE_GRADE, TExperiencePoint } from "./ExperienceSlice";

export default function ExperienceGradeDropdown({
  index,
  experiencePoint,
  setExperienceGrade,
}: {
  index: number;
  experiencePoint: TExperiencePoint;
  setExperienceGrade: (index: number, exp: EXPERIENCE_GRADE) => void;
}) {
  return (
    <div className={"w-auto"}>
      <select
        className="border-2 w-32 my-2 mx-2 pl-2"
        defaultValue={experiencePoint.gradeOfExperience}
        onChange={(event: any) => setExperienceGrade(index, event.target.value)}
      >
        {Object.keys(EXPERIENCE_GRADE).map((it, index) => (
          <option key={index}>{it}</option>
        ))}
      </select>
    </div>
  );
}

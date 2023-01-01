import { TExperience } from "./AboutMe";
import EditExperienceModal from "./EditExperienceModal";

export default function ExperienceTab({
  exp,
  isEditVisible,
  onSaveEdit,
  onDelete,
}: {
  exp: TExperience;
  isEditVisible: boolean;
  onSaveEdit: (exp: TExperience) => void;
  onDelete: (id: string) => void;
}) {
  const onSaveEditedExperience = async (cur: TExperience) => {
    onSaveEdit(cur);
  };

  return (
    <>
      <div className={"flex flex-col w-72 mt-10"}>
        <div className={"flex flex-row"}>
          <EditExperienceModal
            onSaveExp={onSaveEditedExperience}
            onDelete={onDelete}
            id={exp.id}
            isEditVisible={isEditVisible}
            experience={exp}
          />
        </div>
        <p className={"text-green-600 text-xl font-bold mb-2"}>{exp.title}</p>
        <ul>
          {exp.experiencePoints.map((ex, idx) => (
            <li key={`${ex}-${idx}`} className={"font-bold"}>
              {ex}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

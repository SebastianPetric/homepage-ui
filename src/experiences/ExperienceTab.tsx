import { TExperience } from "./AboutMe";
import CreateAndEditExperienceModal from "./CreateAndEditExperienceModal";

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
      <div className={"flex flex-col w-80 mt-10"}>
        <div className={"flex flex-row"}>
          <CreateAndEditExperienceModal
            onSaveExp={onSaveEditedExperience}
            onDelete={onDelete}
            id={exp.id}
            isEditVisible={isEditVisible}
            experience={exp}
          />
        </div>
        <p className={"text-accentColor text-xl font-bold mb-2"}>{exp.title}</p>
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

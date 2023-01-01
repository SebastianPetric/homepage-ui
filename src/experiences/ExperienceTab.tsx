import { TExperience } from "./AboutMe";
import EditExperienceModal from "./EditExperienceModal";
import { FaMinus } from "react-icons/all";

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
            isEditVisible={isEditVisible}
            experience={exp}
          />
          {isEditVisible && (
            <FaMinus
              className={"hover:text-green-600 cursor-pointer ml-2 mb-2"}
              onClick={() => onDelete(exp.id)}
            />
          )}
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

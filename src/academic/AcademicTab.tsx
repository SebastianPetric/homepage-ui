import { FaMinus } from "react-icons/all";
import EditStepModal, { GENERIC_DAO } from "../shared/EditStepModal";

export type TAcademic = {
  id: string;
  title: string;

  school: string;

  from_date: string;

  to_date: string;

  focusList: string[];
};

export type TAcademicDTO = {
  title: string;

  school: string;

  from_date: string;

  to_date: string | undefined;

  focusList: string[];
};

export default function AcademicTab({
  academic,
  isEditVisible,
  onSaveEditedCareer,
  onDelete,
}: {
  academic: TAcademic;
  isEditVisible: boolean;
  onSaveEditedCareer: (academic: GENERIC_DAO) => void;
  onDelete: (id: string) => void;
}) {
  const formattedFromDate = new Date(academic.from_date);
  const formattedToDate = new Date(academic.to_date);
  const academicDt: GENERIC_DAO = {
    id: academic.id,
    title: academic.title,
    institution: academic.school,
    from_date: academic.from_date,
    to_date: academic.to_date,
    points: academic.focusList,
  };

  return (
    <>
      <div
        key={`${academic.id}`}
        className={"flex flex-col items-start careerTileWidth h-auto mt-5 mr-5"}
      >
        {isEditVisible && (
          <div className={"flex flex-row"}>
            <FaMinus
              className={"hover:text-green-600 cursor-pointer mr-2 mb-2"}
              onClick={() => onDelete(academic.id)}
            />
            <EditStepModal
              onSaveExp={onSaveEditedCareer}
              editExpObj={academicDt}
              titleModal={"Bearbeiten"}
            />
          </div>
        )}
        <p className={"text-xl font-bold mb-2 text-green-600"}>
          {academic.title}
        </p>
        <p className={"text-sm font-bold"}>
          {academic.school} von {formattedFromDate.getMonth()}/
          {formattedFromDate.getFullYear()} bis {formattedToDate.getMonth()}/
          {formattedToDate.getFullYear()}
        </p>
        <ul className={"flex flex-col items-start text-sm"}>
          {academic.focusList.map((focus, index) => (
            <li key={`${focus}-${index}`}>{focus}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

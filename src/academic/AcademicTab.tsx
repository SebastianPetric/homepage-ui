import { FaMinus } from "react-icons/all";
import EditStepModal, { GENERIC_DAO } from "../shared/modals/EditStepModal";
import { formatMonthYear } from "../util/DateFormatter";

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
            <EditStepModal
              onSaveExp={onSaveEditedCareer}
              editExpObj={academicDt}
              titleModal={"Bearbeiten"}
            />
            <FaMinus
              className={"hover:text-green-600 cursor-pointer ml-2 mb-2"}
              onClick={() => onDelete(academic.id)}
            />
          </div>
        )}
        <p className={"text-xl font-bold mb-2 text-green-600"}>
          {academic.title}
        </p>
        <p className={"text-sm font-bold"}>
          {academic.school} von {formatMonthYear(academic.from_date)} bis{" "}
          {formatMonthYear(academic.to_date)}
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

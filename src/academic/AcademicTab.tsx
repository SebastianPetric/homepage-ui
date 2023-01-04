import EditAcademicCareerStepModal, {
  GENERIC_DAO,
} from "../shared/modals/EditAcademicCareerStepModal";
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
        className={"flex flex-col items-start w-80 h-auto mt-5 mr-5"}
      >
        <div className={"flex flex-row"}>
          <EditAcademicCareerStepModal
            onSaveExp={onSaveEditedCareer}
            onDelete={onDelete}
            isEditVisible={isEditVisible}
            id={academic.id}
            editExpObj={academicDt}
            titleModal={"Bearbeiten"}
          />
        </div>
        <p className={"text-xl font-bold text-green-600"}>{academic.title}</p>
        <p className={"text-sm font-bold mb-2"}>
          {academic.school} von {formatMonthYear(academic.from_date)} bis{" "}
          {formatMonthYear(academic.to_date)}
        </p>
        <ul
          className={`flex flex-col items-start text-sm ${
            academic.focusList.length > 1 ? "pl-5 list-disc list-outside" : ""
          }`}
        >
          {academic.focusList.map((focus, index) => (
            <li key={`${focus}-${index}`}>{focus}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

import { FaMinus } from "react-icons/all";
import EditStepModal, { GENERIC_DAO } from "../shared/modals/EditStepModal";
import { formatMonthYear } from "../util/DateFormatter";

export type TCareer = {
  id: string;
  title: string;
  company: string;
  from_date: string;
  to_date: string | undefined;
  toDos: string[];
};

export type TCareerDTO = {
  title: string;
  company: string;
  from_date: string;
  to_date: string | undefined;
  toDos: string[];
};

export default function CareerTab({
  career,
  onDelete,
  isEditVisible,
  onSaveEditedCareer,
}: {
  career: TCareer;
  isEditVisible: boolean;
  onDelete: (id: string) => {};
  onSaveEditedCareer: (career: GENERIC_DAO) => void;
}) {
  const careerDt: GENERIC_DAO = {
    id: career.id,
    title: career.title,
    institution: career.company,
    from_date: career.from_date,
    to_date: career.to_date,
    points: career.toDos,
  };

  return (
    <div className={"flex flex-col careerTileWidth mt-5 mr-5"}>
      {isEditVisible && (
        <div className={"flex flex-row"}>
          <EditStepModal
            onSaveExp={onSaveEditedCareer}
            editExpObj={careerDt}
            titleModal={"Bearbeiten"}
          />
          <FaMinus
            className={"hover:text-green-600 cursor-pointer ml-2 mb-2"}
            onClick={() => onDelete(career.id)}
          />
        </div>
      )}
      <p className={"text-xl font-bold mb-2 text-green-600"}>{career.title}</p>
      <p className={"text-sm font-bold"}>
        {career.company} von {formatMonthYear(career.from_date)} bis{" "}
        {formatMonthYear(career.to_date)}
      </p>
      <ul className={"flex flex-col items-start text-sm"}>
        {career.toDos.map((toDo, index) => (
          <li key={`${toDo}-${index}`}>{toDo}</li>
        ))}
      </ul>
    </div>
  );
}

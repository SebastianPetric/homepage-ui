import CreateAndEditAcademicCareerStepModal, {
  GENERIC_DAO,
} from "../shared/modals/CreateAndEditAcademicCareerStepModal";
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
    <div className={"flex flex-col mt-10 mr-5 w-80"}>
      <div className={"flex flex-row"}>
        <CreateAndEditAcademicCareerStepModal
          onSaveExp={onSaveEditedCareer}
          onDelete={onDelete}
          isEditVisible={isEditVisible}
          id={career.id}
          editExpObj={careerDt}
          titleModal={"Bearbeiten"}
        />
      </div>
      <p className={"text-xl font-bold text-green-600"}>{career.title}</p>
      <p className={"text-sm font-bold mb-2"}>
        {career.company} von {formatMonthYear(career.from_date)} bis{" "}
        {formatMonthYear(career.to_date)}
      </p>
      <ul
        className={`flex flex-col items-start text-sm ${
          career.toDos.length > 1 ? "pl-5 list-disc list-outside" : ""
        }`}
      >
        {career.toDos.map((toDo, index) => (
          <li key={`${toDo}-${index}`}>{toDo}</li>
        ))}
      </ul>
    </div>
  );
}

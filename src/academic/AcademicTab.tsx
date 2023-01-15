import { formatMonthYear } from "../util/DateFormatter";
import EditDeleteTileButtons from "../shared/modals/EditDeleteTileButtons";
import React, { useState } from "react";
import EditAcademic from "./EditAcademic";
import { useAppDispatch } from "../hooks/hooks";
import { deleteAcademicStep, TAcademic } from "./AcademicSlice";

export default function AcademicTab({ academic }: { academic: TAcademic }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onDelete = (cur: TAcademic) => {
    dispatch(deleteAcademicStep(cur));
  };

  return (
    <>
      <div
        key={`${academic.id}`}
        className={"flex flex-col items-start w-80 h-auto mt-10 tab"}
      >
        <EditDeleteTileButtons
          setShowModal={setShowModal}
          onDelete={() => onDelete(academic)}
        />
        <EditAcademic
          academic={academic}
          showMdl={showModal}
          setShowMdl={setShowModal}
        />
        <p className={"text-xl font-bold text-accentColor"}>{academic.title}</p>
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

import { formatMonthYear } from "../util/DateFormatter";
import EditDeleteTileButtons from "../shared/modals/EditDeleteTileButtons";
import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { deleteCareerStep, TCareer } from "./CareerSlice";
import EditCareer from "./EditCareer";

export default function CareerTab({ career }: { career: TCareer }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onDelete = (cur: TCareer) => {
    dispatch(deleteCareerStep(cur));
  };

  return (
    <div className={"flex flex-col mt-10 w-80 tab"}>
      <EditDeleteTileButtons
        setShowModal={setShowModal}
        onDelete={() => onDelete(career)}
      />
      <EditCareer
        career={career}
        showMdl={showModal}
        setShowMdl={setShowModal}
      />
      <p className={"text-xl font-bold text-accentColor"}>{career.title}</p>
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

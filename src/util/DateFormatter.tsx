import DatePicker from "react-datepicker";
import React from "react";

export const format = (date: Date | null) => {
  if (date === null) return "";

  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return year + "-" + month + "-" + day;
};

export const formatMonthYear = (date: string | null | undefined) => {
  if (date === null || date === undefined) return "Heute";
  const newDate = new Date(date);

  return newDate.getMonth() + 1 + "/" + newDate.getFullYear();
};

export default function CustomDatePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}) {
  return (
    <div className={"flex flex-row gap-4 w-full"}>
      <div className={"flex flex-col w-1/2"}>
        <p className={"mt-5 font-bold"}>Von:</p>
        <DatePicker
          className={"border-2 mt-2 w-full"}
          selected={startDate}
          dateFormat={"yyyy-MM-dd"}
          onChange={(date) => setStartDate(date)}
        />
      </div>

      <div className={"flex flex-col w-1/2"}>
        <p className={"mt-5 font-bold"}>Bis:</p>
        <DatePicker
          className={"border-2 mt-2 w-full"}
          selected={endDate}
          dateFormat={"yyyy-MM-dd"}
          onChange={(date) => setEndDate(date)}
        />
      </div>
    </div>
  );
}

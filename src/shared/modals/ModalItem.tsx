import React from "react";
import { TKeyValue } from "../../experiences/ExperienceSlice";

export default function ModalItem({
  title,
  keyValue,
  onChangeItem,
}: {
  title: string;
  keyValue: TKeyValue;
  onChangeItem: (cur: TKeyValue) => void;
}) {
  return (
    <>
      <p className={"mt-5 font-bold"}>{title}:</p>
      <input
        className={"border-2 w-full mt-2 mb-2"}
        onChange={(event) =>
          onChangeItem({ key: keyValue.key, value: event.target.value })
        }
        value={keyValue.value}
      ></input>
    </>
  );
}

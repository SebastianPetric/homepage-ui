import React from "react";

export default function ModalItem({
  title,
  value,
  setValue,
}: {
  title: string;
  value: string;
  setValue: (val: string) => void;
}) {
  return (
    <>
      <p className={"mt-5 font-bold"}>{title}:</p>
      <input
        className={"border-2 w-full mt-2 mb-2"}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      ></input>
    </>
  );
}

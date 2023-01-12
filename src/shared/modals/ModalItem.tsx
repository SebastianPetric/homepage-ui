import React from "react";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import reducers from "../../reducers/Reducers";
import { update } from "../../user/UserSlice";
import { TKeyValue } from "./CreateAndEditAcademicCareerStepModal";

export default function ModalItem({
  title,
  keyValue,
}: {
  title: string;
  keyValue: TKeyValue;
}) {
  const dispatch =
    useDispatch<ThunkDispatch<ReturnType<typeof reducers>, any, AnyAction>>();
  return (
    <>
      <p className={"mt-5 font-bold"}>{title}:</p>
      <input
        className={"border-2 w-full mt-2 mb-2"}
        onChange={(event) =>
          dispatch(update({ key: keyValue.key, value: event.target.value }))
        }
        value={keyValue.value}
      ></input>
    </>
  );
}

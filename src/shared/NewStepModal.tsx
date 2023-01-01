import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/all";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker, { format } from "../util/DateFormatter";

export type TExperienceKeyValue = {
  key: string;
  value: string;
};

export type GENERIC_DTO = {
  title: string;

  institution: string;

  from_date: string;

  to_date: string | undefined;

  points: string[];
};

export default function NewStepModal({
  isEditVisible,
  onSaveExp,
  titleModal,
}: {
  isEditVisible: boolean;
  onSaveExp: (obj: GENERIC_DTO) => void;
  titleModal: string;
}) {
  const [showModal, setShowModal] = useState<boolean>();
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [institution, setInstitution] = useState<string>("");
  const [formattedFromDate, setFormattedFromDate] = useState<string>("");
  const [formattedToDate, setFormattedToDate] = useState<string | undefined>(
    undefined
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [experiences, setExperiences] = useState<TExperienceKeyValue[]>([]);

  useEffect(() => {
    let tmp = experiences.map((it) => it.value);

    if (
      title !== "" &&
      institution !== "" &&
      formattedFromDate !== "" &&
      tmp.length !== 0 &&
      !tmp.includes("")
    )
      setIsSavingPossible(true);
    else setIsSavingPossible(false);
  }, [title, institution, experiences]);

  useEffect(() => {
    if (startDate) setFormattedFromDate(format(startDate));
    if (endDate) setFormattedToDate(format(endDate));
  }, [startDate, endDate]);

  const editExperiencePoint = (cur: TExperienceKeyValue) => {
    let tmp = [...experiences];
    tmp.forEach((exp) => {
      if (exp.key === cur.key) {
        exp.value = cur.value;
      }
    });
    setExperiences(tmp);
  };

  const addNewExperiencePoint = () => {
    let newExp: TExperienceKeyValue = {
      key: `new-${Math.random() * 10}`,
      value: "",
    };
    let tmp = [...experiences, newExp];
    setExperiences(tmp);
  };

  const deleteExperiencePoint = (cur: TExperienceKeyValue) => {
    let tmp = experiences.filter((it) => it !== cur);
    setExperiences(tmp);
  };

  const onSave = () => {
    setShowModal(false);
    let tmp = [...experiences];
    let expArray: string[] = tmp
      .filter((exp) => exp.value !== "")
      .map((it) => it.value);

    let newObj: GENERIC_DTO = {
      title: title,
      institution: institution,
      from_date: formattedFromDate,
      to_date: formattedToDate,
      points: expArray,
    };
    onSaveExp(newObj);
  };

  return (
    <>
      {isEditVisible ? (
        <>
          <button
            className="bg-green-500 w-auto h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold hover:text-white cursor-pointer mt-10"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Erstellen
          </button>
          {showModal ? (
            <>
              <div className="fixed inset-0 z-20 overflow-y-auto">
                <div
                  className="fixed inset-0 w-full h-full bg-black opacity-40"
                  onClick={() => setShowModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                  <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="mt-3 sm:flex">
                      <div className="mt-2 text-center sm:ml-4 sm:text-left w-full">
                        <h4 className="text-lg font-medium text-gray-800">
                          {titleModal}
                        </h4>
                        <div>
                          <p className={"mt-5"}>Titel</p>
                          <input
                            className={"border-2 w-full mt-2 mb-2"}
                            onChange={(event) => setTitle(event.target.value)}
                          ></input>

                          <p className={"mt-5"}>Institution</p>
                          <input
                            className={"border-2 w-full mt-2 mb-2"}
                            onChange={(event) =>
                              setInstitution(event.target.value)
                            }
                          ></input>

                          <CustomDatePicker
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                          />

                          <div className={"flex flex-row items-center mt-5"}>
                            <p>Erfahrungen</p>
                            <FaPlus
                              className={
                                "ml-5 hover:text-green-600 cursor-pointer"
                              }
                              onClick={addNewExperiencePoint}
                            />
                          </div>
                          {experiences.map((exp, index) => (
                            <div
                              key={`${exp}-${index}`}
                              className={"flex flex-row items-center"}
                            >
                              <input
                                className={"border-2 w-full mt-2 mb-2"}
                                onChange={(event) =>
                                  editExperiencePoint({
                                    key: exp.key,
                                    value: event.target.value,
                                  })
                                }
                              ></input>
                              <FaMinus
                                className={
                                  "ml-5 hover:text-green-600 cursor-pointer"
                                }
                                onClick={() => deleteExperiencePoint(exp)}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="items-center gap-2 mt-3 sm:flex mt-5">
                          <button
                            className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-600 focus:ring-2"
                            disabled={!isSavingPossible}
                            onClick={onSave}
                          >
                            Speichern
                          </button>
                          <button
                            className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                            onClick={() => setShowModal(false)}
                          >
                            Abbrechen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}

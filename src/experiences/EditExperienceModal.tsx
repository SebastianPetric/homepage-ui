import React, { useEffect, useState } from "react";
import { FaEdit, FaMinus, FaPlus } from "react-icons/all";
import { TExperience } from "./AboutMe";
import { TExp } from "./NewExperienceModal";

export default function EditExperienceModal({
  onSaveExp,
  isEditVisible,
  experience,
}: {
  onSaveExp: (exp: TExperience) => void;
  isEditVisible: boolean;
  experience: TExperience;
}) {
  const [showModal, setShowModal] = useState<boolean>();
  const [title, setTitle] = useState<string>(experience.title);
  const [isSavingPossible, setIsSavingPossible] = useState<boolean>(false);
  const [experiencePoints, setExperiencePoints] = useState<TExp[]>([]);

  useEffect(() => {
    const tmp = experience.experiencePoints.map((it) => {
      return {
        key: `new-${Math.random() * 10}`,
        value: it,
      };
    });
    setExperiencePoints(tmp);
  }, []);

  useEffect(() => {
    let tmp = experiencePoints.map((it) => it.value);
    if (title !== "" && tmp.length !== 0 && !tmp.includes(""))
      setIsSavingPossible(true);
    else setIsSavingPossible(false);
  }, [title, experiencePoints]);

  const editSpecificExperiencePoint = (cur: TExp) => {
    let tmp = [...experiencePoints];
    tmp.forEach((exp) => {
      if (exp.key === cur.key) {
        exp.value = cur.value;
      }
    });
    setExperiencePoints(tmp);
  };

  const addNewExperiencePoint = () => {
    let newExp: TExp = {
      key: `new-${Math.random() * 10}`,
      value: "",
    };
    let tmp = [...experiencePoints, newExp];
    setExperiencePoints(tmp);
  };

  const deleteSpecificExperiencePoint = (cur: TExp) => {
    let tmp = experiencePoints.filter((it) => it !== cur);
    setExperiencePoints(tmp);
  };

  const onSave = (id: string) => {
    setShowModal(false);
    let tmp = [...experiencePoints];
    let expArray: string[] = tmp
      .filter((exp) => exp.value !== "")
      .map((it) => it.value);
    let newObj: TExperience = {
      id: id,
      title: title,
      experiencePoints: expArray,
    };
    onSaveExp(newObj);
  };

  return (
    <>
      {isEditVisible ? (
        <>
          <FaEdit
            className={"hover:text-green-600 cursor-pointer mb-2"}
            onClick={() => setShowModal(true)}
          />
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
                          Erfahrungen hinzufügen
                        </h4>
                        <div>
                          <p className={"mt-5"}>Titel</p>
                          <input
                            className={"border-2 w-full mt-2 mb-2"}
                            onChange={(event) => setTitle(event.target.value)}
                            value={title}
                          ></input>
                          <div className={"flex flex-row items-center mt-5"}>
                            <p>Erfahrungen</p>
                            <FaPlus
                              className={
                                "ml-5 hover:text-green-600 cursor-pointer"
                              }
                              onClick={addNewExperiencePoint}
                            />
                          </div>
                          {experiencePoints.map((exp, index) => (
                            <div
                              key={`${exp}-${index}`}
                              className={"flex flex-row items-center"}
                            >
                              <input
                                className={"border-2 w-full mt-2 mb-2"}
                                onChange={(event) =>
                                  editSpecificExperiencePoint({
                                    key: exp.key,
                                    value: event.target.value,
                                  })
                                }
                                value={exp.value}
                              ></input>
                              <FaMinus
                                className={
                                  "ml-5 hover:text-green-600 cursor-pointer"
                                }
                                onClick={() =>
                                  deleteSpecificExperiencePoint(exp)
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className="items-center gap-2 mt-3 sm:flex mt-5">
                          <button
                            className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-600 focus:ring-2"
                            disabled={!isSavingPossible}
                            onClick={() => onSave(experience.id)}
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

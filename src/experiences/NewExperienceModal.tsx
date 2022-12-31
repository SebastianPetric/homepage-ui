import React, {useEffect, useState} from 'react';
import {FaMinus, FaPlus} from "react-icons/all";
import {TExperienceDTO} from "./AboutMe";

export type TExp = {
    key: string,
    value: string
}


export default function NewExperienceModal({
                                               onSaveExp,
                                               isEditVisible
                                           }: { onSaveExp: (exp: TExperienceDTO) => void, isEditVisible: boolean }) {
    const [showModal, setShowModal] = useState<boolean>();
    const [title, setTitle] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(false);
    const [experiences, setExperiences] = useState<TExp[]>([]);


    useEffect(() => {
        let tmp = experiences.map(it => it.value);
        if (title !== '' && tmp.length !== 0 && !tmp.includes(''))
            setIsActive(true);
        else
            setIsActive(false);
    }, [title, experiences]);


    const setExp = (cur: TExp) => {
        let tmp = [...experiences]
        tmp.forEach(exp => {
            if (exp.key === cur.key) {
                exp.value = cur.value;
            }
        });
        setExperiences(tmp);
    }

    const addExp = () => {
        let newExp: TExp = {
            key: `new-${Math.random() * 10}`,
            value: ""
        }
        let tmp = [...experiences, newExp]
        setExperiences(tmp);
    };

    const deleteExp = (cur: TExp) => {
        let tmp = experiences.filter(it => it !== cur);
        setExperiences(tmp);
    };

    const onSave = () => {
        setShowModal(false);
        let tmp = [...experiences];
        let expArray: string[] = tmp.filter(exp => exp.value !== '').map(it => it.value);
        let newObj: TExperienceDTO = {
            title: title,
            experiencePoints: expArray
        }
        onSaveExp(newObj);
    }

    return (<>{isEditVisible ? (<>
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
                                        Erfahrungen hinzufügen
                                    </h4>
                                    <div>
                                        <p className={"mt-5"}>Titel</p>
                                        <input className={"border-2 w-full mt-2 mb-2"}
                                               onChange={(event => setTitle(event.target.value))}></input>
                                        <div className={"flex flex-row items-center mt-5"}>
                                            <p>Erfahrungen</p>
                                            <FaPlus className={"ml-5 hover:text-green-600 cursor-pointer"}
                                                    onClick={addExp}/>
                                        </div>
                                        {
                                            experiences.map((exp, index) => (<div key={`${exp}-${index}`}
                                                                                  className={"flex flex-row items-center"}>
                                                <input className={"border-2 w-full mt-2 mb-2"}
                                                       onChange={(event) => setExp({
                                                           key: exp.key,
                                                           value: event.target.value
                                                       })}></input>
                                                <FaMinus className={"ml-5 hover:text-green-600 cursor-pointer"}
                                                         onClick={() => deleteExp(exp)}/>
                                            </div>))
                                        }
                                    </div>
                                    <div className="items-center gap-2 mt-3 sm:flex mt-5">
                                        <button
                                            className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-600 focus:ring-2"
                                            disabled={!isActive}
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
    </>) : null}
    </>);
}
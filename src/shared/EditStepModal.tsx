import React, {useEffect, useState} from 'react';
import {FaEdit, FaMinus, FaPlus} from "react-icons/all";

export type TExperienceKeyValue = {
    key: string,
    value: string
}

export type GENERIC_DAO = {
    id: string,
    title: string,
    institution: string,
    from_date: string,
    to_date: string | undefined,
    points: string[]
}


export default function EditStepModal({
                                          titleModal,
                                          onSaveExp,
                                          editExpObj,
                                      }: { onSaveExp: (obj: GENERIC_DAO) => void, editExpObj: GENERIC_DAO, titleModal: string }) {
    const [showModal, setShowModal] = useState<boolean>();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [id, setId] = useState<string>(editExpObj.id);
    const [title, setTitle] = useState<string>(editExpObj.title);
    const [institution, setInstitution] = useState<string>(editExpObj.institution);
    const [fromDate, setFromDate] = useState<string>(editExpObj.from_date);
    const [toDate, setToDate] = useState<string | undefined>(editExpObj.to_date);

    const [experiences, setExperiences] = useState<TExperienceKeyValue[]>([]);


    useEffect(() => {
        const tmp = editExpObj.points.map(it => ({
            key: `new-${Math.random() * 10}`,
            value: it
        }));
        setExperiences(tmp);
    }, []);

    useEffect(() => {
        let tmp = experiences.map(it => it.value);
        if (title !== '' && institution !== '' && fromDate !== '' && tmp.length !== 0 && !tmp.includes(''))
            setIsActive(true);
        else
            setIsActive(false);
    }, [title, institution, fromDate, experiences]);


    const setExp = (cur: TExperienceKeyValue) => {
        let tmp = [...experiences]
        tmp.forEach(exp => {
            if (exp.key === cur.key) {
                exp.value = cur.value;
            }
        });
        setExperiences(tmp);
    }

    const addExp = () => {
        let newExp: TExperienceKeyValue = {
            key: `new-${Math.random() * 10}`,
            value: ""
        }
        let tmp = [...experiences, newExp]
        setExperiences(tmp);
    };

    const deleteExp = (cur: TExperienceKeyValue) => {
        let tmp = experiences.filter(it => it !== cur);
        setExperiences(tmp);
    };

    const onSave = () => {
        setShowModal(false);
        let tmp = [...experiences];
        let expArray: string[] = tmp.filter(exp => exp.value !== '').map(it => it.value);
        let newObj: GENERIC_DAO = {
            id: id,
            title: title,
            institution: institution,
            from_date: fromDate,
            to_date: toDate,
            points: expArray
        }
        onSaveExp(newObj);
    }

    return (<>
        <FaEdit className={"hover:text-green-600 cursor-pointer mb-2"} onClick={() => setShowModal(true)}/>
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
                                        <input className={"border-2 w-full mt-2 mb-2"}
                                               onChange={(event => setTitle(event.target.value))} value={title}></input>

                                        <p className={"mt-5"}>Institution</p>
                                        <input className={"border-2 w-full mt-2 mb-2"}
                                               onChange={(event => setInstitution(event.target.value))}
                                               value={institution}></input>

                                        <div className={"flex flex-row"}>
                                            <div className={"flex flex-col w-1/2 mr-2"}>
                                                <p className={"mt-5"}>Von</p>
                                                <input className={"border-2 w-full mt-2 mb-2"}
                                                       onChange={(event => setFromDate(event.target.value))}
                                                       placeholder={"yyyy-mm-tt"} value={fromDate}></input>
                                            </div>

                                            <div className={"flex flex-col  w-1/2"}>
                                                <p className={"mt-5"}>Bis (kein Datum = Heute)</p>
                                                <input className={"border-2 w-full mt-2 mb-2"}
                                                       onChange={(event => setToDate(event.target.value))}
                                                       placeholder={"yyyy-mm-tt"} value={toDate ? toDate : ""}></input>
                                            </div>
                                        </div>

                                        <div className={"flex flex-row items-center mt-5"}>
                                            <p>Erfahrungen</p>
                                            <FaPlus className={"ml-5 hover:text-green-600 cursor-pointer"}
                                                    onClick={addExp}/>
                                        </div>
                                        {
                                            experiences.map((exp, index) => (<div key={`${exp}-${index}`}
                                                                                  className={"flex flex-row items-center"}>
                                                <input className={"border-2 w-full mt-2 mb-2"}
                                                       value={exp.value}
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
    </>);
}
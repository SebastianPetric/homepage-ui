import React, {useEffect, useState} from 'react';
import {FaEdit} from "react-icons/all";
import {TUserInfo} from "./InfoTab";


export default function EditInfoModal({
                                          onSaveUserInfo,
                                          editUserInfoObj,
                                      }: { onSaveUserInfo: (obj: TUserInfo) => void, editUserInfoObj: TUserInfo }) {
    const [showModal, setShowModal] = useState<boolean>();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>(editUserInfoObj.first_name);
    const [lastName, setLastName] = useState<string>(editUserInfoObj.last_name);
    const [phone, setPhone] = useState<string>(editUserInfoObj.phone);
    const [email, setEmail] = useState<string>(editUserInfoObj.email);
    const [github, setGithub] = useState<string>(editUserInfoObj.github_link);
    const [linkedin, setLinkedIn] = useState<string>(editUserInfoObj.linkedin_link);
    const [xing, setXing] = useState<string>(editUserInfoObj.xing_link);


    useEffect(() => {
        if (firstName === '' || lastName === '' || phone === '' || email == '' || github === '' || linkedin === '' || xing === '')
            setIsActive(false);
        else
            setIsActive(true);
    }, [firstName, lastName, phone, email, github, linkedin, xing])

    const onSave = () => {
        const edited: TUserInfo = {...editUserInfoObj};
        edited.first_name = firstName;
        edited.last_name = lastName;
        edited.phone = phone;
        edited.email = email;
        edited.github_link = github;
        edited.linkedin_link = linkedin;
        edited.xing_link = xing;
        setShowModal(false);
        onSaveUserInfo(edited);
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
                                        Bearbeiten
                                    </h4>
                                    <div>
                                        <p className={"mt-5"}>Vorname</p>
                                        <input className={"border-2 w-full mt-2 mb-2"}
                                               onChange={(event => setFirstName(event.target.value))}
                                               value={firstName}></input>

                                        <p className={"mt-5"}>Nachname</p>
                                        <input className={"border-2 w-full mt-2 mb-2"}
                                               onChange={(event => setLastName(event.target.value))}
                                               value={lastName}></input>

                                        <p className={"mt-5"}>Mobilfunk</p>
                                        <input className={"border-2 w-full mt-2 mb-2"}
                                               onChange={(event => setPhone(event.target.value))}
                                               value={phone}></input>

                                        <p className={"mt-5"}>Email</p>
                                        <input className={"border-2 w-full mt-2 mb-2"}
                                               onChange={(event => setEmail(event.target.value))}
                                               value={email}></input>


                                        <p className={"mt-5"}>Github</p>
                                        <input className={"border-2 w-full mt-2 mb-2"}
                                               onChange={(event => setGithub(event.target.value))}
                                               value={github}></input>

                                        <p className={"mt-5"}>LinkedIn</p>
                                        <input className={"border-2 w-full mt-2 mb-2"}
                                               onChange={(event => setLinkedIn(event.target.value))}
                                               value={linkedin}></input>

                                        <p className={"mt-5"}>Xing</p>
                                        <input className={"border-2 w-full mt-2 mb-2"}
                                               onChange={(event => setXing(event.target.value))}
                                               value={xing}></input>

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
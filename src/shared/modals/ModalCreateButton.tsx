import React from "react";
import { useSelector } from "react-redux";

export default function ModalCreateButton({
  setShowModal,
}: {
  setShowModal: (id: boolean) => void;
}) {
  const isLoggedIn: boolean = useSelector((state: any) => {
    return state.authentication.isAuthenticated;
  });

  return (
    <>
      {isLoggedIn ? (
        <button
          className="bg-accentColor w-auto h-20 rounded rounded-br-3xl flex items-center justify-center text-xl font-bold hover:text-white cursor-pointer mt-10"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Erstellen
        </button>
      ) : undefined}
    </>
  );
}

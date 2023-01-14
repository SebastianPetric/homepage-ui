import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ModalCreateButton({
  setShowModal,
}: {
  setShowModal: (id: boolean) => void;
}) {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
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

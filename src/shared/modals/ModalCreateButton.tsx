import React from "react";

export default function ModalCreateButton({
  setShowModal,
  isEditVisible,
}: {
  setShowModal: (id: boolean) => void;
  isEditVisible: boolean;
}) {
  return (
    <>
      {isEditVisible ? (
        <button
          className="bg-green-500 w-auto h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold hover:text-white cursor-pointer mt-10"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Erstellen
        </button>
      ) : undefined}
    </>
  );
}

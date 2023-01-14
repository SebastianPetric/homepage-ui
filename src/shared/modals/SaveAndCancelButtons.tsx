import React from "react";

export default function SaveAndCancelButtons({
  isSavingPossible,
  onSave,
  setShowModal,
}: {
  isSavingPossible: boolean;
  onSave: () => void;
  setShowModal: (shouldShow: boolean) => void;
}) {
  return (
    <div className="items-center gap-2 mt-3 sm:flex mt-5">
      <button
        className="w-full mt-2 p-2.5 flex-1 text-white bg-accentColor rounded-md outline-none ring-offset-2 ring-accentColor focus:ring-2"
        disabled={!isSavingPossible}
        onClick={onSave}
      >
        Speichern
      </button>
      <button
        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-accentColor focus:ring-2"
        onClick={() => setShowModal(false)}
      >
        Abbrechen
      </button>
    </div>
  );
}

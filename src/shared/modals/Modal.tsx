import React from "react";
import ModalHeader from "./ModalHeader";

export default function Modal({
  shouldShowModal,
  setShowModal,
  titleModal,
  children,
}: {
  shouldShowModal: boolean;
  setShowModal: (showModal: boolean) => void;
  titleModal: string;
  children: JSX.Element[];
}) {
  return (
    <>
      {shouldShowModal ? (
        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3 sm:flex">
                <div className="mt-2 text-left w-full">
                  <ModalHeader titleModal={titleModal} />
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : undefined}
    </>
  );
}

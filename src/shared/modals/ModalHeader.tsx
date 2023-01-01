import React from "react";

export default function ModalHeader({ titleModal }: { titleModal: string }) {
  return (
    <h4 className="text-2xl font-bold font-medium text-gray-800">
      {titleModal}
    </h4>
  );
}

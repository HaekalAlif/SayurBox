import React from "react";

const BaseModal = ({
  open,
  onClose,
  title,
  description,
  confirmText = "Ya",
  cancelText = "Kembali",
  onConfirm,
  confirmColor = "bg-red-500 hover:bg-red-600",
  cancelColor = "border-green-600 text-green-600 hover:bg-green-50",
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-lg px-8 py-6 min-w-[450px] max-w-sm mx-auto text-center border border-gray">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <div className="w-10 h-1 bg-black mx-auto rounded-full mb-2" />
            <div className="w-10 h-1 bg-black mx-auto rounded-full mb-2" />
          </div>
          <h2 className="text-xl font-bold mb-5">{title}</h2>
          <p className="mb-8 text-gray-700">{description}</p>
          <div className="flex gap-4 justify-between w-full">
            <button
              className={`px-8 max-w-lg py-3 rounded-lg font-bold border cursor-pointer ${cancelColor} `}
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              className={`px-12 py-3 rounded-lg font-bold text-white cursor-pointer ${confirmColor}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;

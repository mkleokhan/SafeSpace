import React from "react";

const Modal = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-center mt-4">
          {" "}
          {/* Center the button */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onClose} // Correctly using the onClose function
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

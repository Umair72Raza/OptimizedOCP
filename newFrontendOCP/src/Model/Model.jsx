/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Model = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-10 w-96 bg-white p-6 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Model;

import React from 'react'
import { RxCross1 } from "react-icons/rx";
import Choosesub from './Choosesub';

export const Creaditmodel = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0000008f] flex items-center justify-center">
      {/* Backdrop click closes modal */}
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />

      {/* Modal box */}
      <div 
        role="dialog"
        aria-modal="true"
        className="relative bg-white rounded-lg shadow-xl w-[90%] sm:w-[90%] h-[90%] max-w-6xl z-[10000] transform transition-all"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <RxCross1 size={20} />
        </button>

        {/* Content */}
        <div className="p-6">
          <Choosesub closeModal={onClose} />
        </div>
      </div>
    </div>
  );
};

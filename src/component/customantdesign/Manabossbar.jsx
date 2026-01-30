import React from "react";
import { IoIosWarning } from "react-icons/io";

const Manabossbar = ({ totalContacts, usedContacts }) => {
  const leftContacts = totalContacts - usedContacts;

  const progress =
    totalContacts > 0 ? (usedContacts / totalContacts) * 100 : 0;

  return (
    <div className="w-full rounded-lg border bg-white p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">Limited contacts</h3>
        <span className="text-xl font-bold text-gray-700">
          {leftContacts} left
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {leftContacts <= 0 && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
          <IoIosWarning className="text-lg" /> You have exhausted your free contacts
        </div>
      )}
    </div>
  );
};

export default Manabossbar;

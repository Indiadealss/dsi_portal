import React, { useState } from "react";
import { Handshake, Truck, Building2, Check } from "lucide-react";

const ROLES = [
  {
    key: "Broker",
    label: "Broker",
    description: "List property, get quality leads and grow your business",
    icon: Handshake,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    key: "Builder",
    label: "Builder",
    description: "Showcase your projects, reach more buyers and build your brand",
    icon: Truck,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    key: "Buyer",
    label: "Buyer",
    description: "Find your perfect property for living or investment",
    icon: Building2,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

const SelectUserRole = ({ onContinue, onSkip }) => {
  const [selected, setSelected] = useState("");

  return (
    <div>
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Tell us how you want to use INDIADEALS
        
      </h2>
      <p className="text-center text-sm text-gray-500 mt-2 mb-6">
        This helps us personalize your experience
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {ROLES.map(({ key, label, description, icon: Icon, iconBg, iconColor }) => {
          const isSelected = selected === key;
          return (
            <div
              key={key}
              onClick={() => setSelected(key)}
              className={`relative cursor-pointer rounded-xl border-2 p-3 sm:p-5 text-center transition-colors ${
                isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
              <div
                className={`mx-auto mb-3 flex items-center justify-center w-12 h-12 rounded-full ${iconBg}`}
              >
                <Icon className={iconColor} size={22} />
              </div>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">{label}</p>
              {/* <p className="text-xs text-gray-500 mt-1 leading-snug">{description}</p> */}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onContinue(selected)}
        disabled={!selected}
        className={`w-full mt-6 text-lg font-medium p-2.5 rounded text-white ${
          selected
            ? "cursor-pointer bg-blue-500 shadow-lg shadow-blue-500/50"
            : "cursor-not-allowed bg-blue-200"
        }`}
      >
        Continue
      </button>

      <p
        className="text-center text-sm text-gray-500 mt-3 cursor-pointer hover:underline"
        onClick={onSkip}
      >
        Skip for now
      </p>
    </div>
  );
};

export default SelectUserRole;

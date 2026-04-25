import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

const AlertBox = ({ type = "success", message, onClose }) => {
     if (!message) return null;
  const [progress, setProgress] = useState(100);

  const config = {
    success: {
      icon: <CheckCircle size={20} />,
      style: "bg-green-50 border-green-400 text-green-700",
      progress: "bg-green-500",
    },
    error: {
      icon: <XCircle size={20} />,
      style: "bg-red-50 border-red-400 text-red-700",
      progress: "bg-red-500",
    },
    warning: {
      icon: <AlertTriangle size={20} />,
      style: "bg-yellow-50 border-yellow-400 text-yellow-700",
      progress: "bg-yellow-500",
    },
    info: {
      icon: <Info size={20} />,
      style: "bg-blue-50 border-blue-400 text-blue-700",
      progress: "bg-blue-500",
    },
  };

  // auto progress + auto close
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 2);
    }, 60);

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[9999] w-[350px] 
      backdrop-blur-md bg-white/80 border-l-4 rounded-xl shadow-2xl 
      animate-slideIn overflow-hidden ${config[type].style}`}
    >
      {/* Content */}
      <div className="flex items-start gap-3 p-4">
        <div className="mt-1">{config[type].icon}</div>

        <div className="flex-1">
          <p className="text-sm font-semibold">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-black transition"
        >
          ✕
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200">
        <div
          className={`h-full ${config[type].progress} transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default AlertBox;
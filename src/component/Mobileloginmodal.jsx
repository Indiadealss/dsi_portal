import React, { useEffect } from "react";
import { Loginform } from "./Loginform";

const Mobileloginmodal = ({ open, onClose }) => {
    // Close modal when pressing ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={onClose}
                ></div>
            )}

            {/* Bottom Sheet */}
            <div 
                className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-50 transform transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="p-6">
                <div className="flex justify-center">
                    <h3 className='text-2xl font-semibold'>Login/Register</h3>
                </div>
                <div>
                    <Loginform />
                </div>
                </div>
            </div>
        </>
    );
};

export default Mobileloginmodal;

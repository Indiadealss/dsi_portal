import React, { useState } from "react";
import loginBg from "../Images/loginPageimage.png";
import EmailPick from "../Images/material-icon-theme_google.png";

const Emailregistration = ({ closeEmail }) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  return (
    <div
      
    >
      
      <div className=" mx-auto  h-max bg-white ">
        
        {/* Heading */}
        <div className="flex">
          <h2 className="text-center mx-auto">
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: "sans-serif" }}
            >
              Welcome Back
            </span>
          </h2>
        </div>

        {/* Sub Heading */}
        <div className="mb-3">
          <label className="block my-2 mb-5 text-sm font-normal text-gray-500 text-center">
            Login or signup in seconds to continue your property journey.
          </label>

          {/* Label */}
          <label className="text-xs">Email Address</label>

          {/* Input */}
          <div className="flex items-center border border-gray-300 overflow-hidden bg-white rounded mt-1">
            
            {/* Icon */}
            <div className="flex items-center gap-1 px-4 bg-white border-r border-gray-200">
              <img
                src={EmailPick}
                alt="email"
                className="w-5 h-5"
              />
            </div>

            {/* Input */}
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-1 outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>

          {/* Error */}
          {!isValid && email.length > 0 && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid email address
            </p>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            type="button"
            disabled={!isValid}
            className={`${
              isValid
                ? "cursor-pointer w-full text-xl text-white font-medium bg-blue-500 p-2 rounded"
                : "cursor-not-allowed w-full text-xl text-white font-medium bg-blue-200 p-2 rounded"
            }`}
          >
            Continue
          </button>
        </div>

        {/* Divider */}
        <div>
          <div className="flex justify-between mt-2">
            <hr className="border-t border-gray-300 my-4 w-[42%]" />
            <span className="text-gray-300 text-xl">or</span>
            <hr className="border-t border-gray-300 my-4 w-[42%]" />
          </div>
        </div>

        {/* Mobile Login Button */}
        <div className="flex justify-center my-5">
          <button
            type="button"
            onClick={closeEmail}
            className="flex justify-center cursor-pointer w-full text-sm font-medium text-gray-700 border border-gray-300 bg-white p-2 rounded"
          >
            <span className="my-auto">
              Continue With Mobile Number
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Emailregistration;
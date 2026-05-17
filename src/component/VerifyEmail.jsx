import React, { useState } from "react";
// import { verifyEmailOtp } from "../api/api";

const VerifyEmail = ({ email, changeEmailOtp, closeModal }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    // try {
    //   const res = await verifyEmailOtp(email, otp);

    //   if (res.status === 200) {
    //     alert("Email Verified");

    //     closeModal();
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center">
        Verify Email
      </h2>

      <p className="text-sm text-gray-500 text-center mt-2">
        OTP sent to {email}
      </p>

      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="border border-gray-300 rounded w-full p-2 mt-5 outline-none"
      />

      <button
        onClick={handleVerify}
        disabled={otp.length < 6}
        className={`mt-5 w-full p-2 rounded text-white ${
          otp.length < 6
            ? "bg-blue-200 cursor-not-allowed"
            : "bg-blue-500"
        }`}
      >
        Verify OTP
      </button>

      <button
        onClick={changeEmailOtp}
        className="text-blue-500 mt-4 text-sm"
      >
        Change Email
      </button>
    </div>
  );
};

export default VerifyEmail;
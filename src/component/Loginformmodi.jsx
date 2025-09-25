import React, { useState } from "react";

const Loginformmodi = () => {
    const [email, setEmail] = useState("");
      const [mobile, setMobile] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [name, setName] = useState("");
      const [otp, setOtp] = useState("");
      const [otpSent, setOtpSent] = useState(false);
  return (
    <>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
            <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your phone number" />
          </div>
          <div >
          <button type="button" className="bg-blue-500 shadow-lg shadow-blue-500/50 p-2 rounded-lg">
            verify mobile
          </button>
          </div>
    </>
  )
}

export default Loginformmodi
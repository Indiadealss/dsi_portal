import React, { useState } from 'react'
import { register } from '../api/api';

const Registration = ({resMobile}) => {
    const [name,setName] = useState("")
    const [email, setEmail] = useState("");

    const handleSend = async () => {
            try{
                const res = await register(name,email,resMobile);
                console.log("otp sent:",res.status);
                if(res.status === 200) {
                  alert("You have Register Succesfully");
                }
                
            }catch(err) {
              console.error("Error sending OTP:", err);
              
            }
          };
  return (
    <div>
        <div className="flex">
        <h2><span className="text-2xl font-bold text-gray-700" style={{fontFamily:"sans-serif"}}>Create Account</span></h2>
      </div>
      <div className="my-5">
            {/* <label className="block my-2 mb-5 text-sm font-normal text-gray-500 dark:text-white">Full Name</label> */}
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Full Name" />
          </div>
          <div className="my-5">
            {/* <label className="block my-2 mb-5 text-sm font-normal text-gray-500 dark:text-white">Email</label> */}
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Enter your Email" />
          </div>
          <div className="my-5">
            {/* <label className="block my-2 mb-5 text-sm font-normal text-gray-500 dark:text-white">Email</label> */}
            <input type="text" value={resMobile}  disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Phone Number" />
          </div>
          <button type="button" onClick={handleSend} disabled={resMobile.length < 10} className={`${resMobile.length > 9 ? "cursor-pointer w-full text-xl text-white font-medium bg-blue-500 shadow-lg shadow-blue-500/50 p-2 rounded" : "cursor-not-allowed w-full text-xl text-white font-medium bg-blue-200 shadow-lg shadow-blue-100 p-2 rounded"}`}>
            Create Account
          </button>
    </div>
  )
}

export default Registration;

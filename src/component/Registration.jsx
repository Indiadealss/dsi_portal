import React, { useState } from 'react'
import { register } from '../api/api';

const Registration = ({resMobile,closeModal}) => {
    const [name,setName] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [inputLabel, setinputLabel] = useState('');
    const [email, setEmail] = useState("");

    const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value === '') {
      setIsValid(false);
      setinputLabel('');
    } else if (validateEmail(value)) {
      setIsValid(true);
      setinputLabel('');
    } else {
      setIsValid(false);
      setinputLabel('That looks like an invalid email (ex: abc@xyz.com)');
    }
  };

    const handleSend = async () => {
            try{
              if(!name || name.length <= 3){
                alert('Enter the valid Name');
                return false;
              }
              if(!email.length || !isValid){
                return false;
              }
              
                const res = await register(name,email,resMobile,closeModal);
                // console.log("otp sent:",res.status);
                if(res.status === 200) {
                  alert("You have Register Succesfully");
                    if (closeModal) closeModal();
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
            {/* <label className="block my-2 mb-5 text-sm font-normal text-gray-500 ">Full Name</label> */}
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className=" border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     outline-none" placeholder="Full Name" />
          </div>
          <div className="rounded border mt-5 border-gray-300">
        <div
          className={`${
            isValid
              ? 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'
              : 'text-red-600 font-medium h-[5px] text-xs px-2 rounded-t'
          }`}
        >
          <span>{inputLabel}</span>
        </div>

        <input
          type="text"
          value={email}
          onChange={handleChange}
          className="w-full p-2 rounded-b outline-none"
          placeholder="Enter your Email Id"
        />
      </div>
          <div className="my-5">
            {/* <label className="block my-2 mb-5 text-sm font-normal text-gray-500 ">Email</label> */}
            <input type="text" value={resMobile}  disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     outline-none" placeholder="Phone Number" />
          </div>
          <button type="button" onClick={handleSend} disabled={!resMobile || resMobile.length < 10} className={`${!resMobile || resMobile.length > 9 ? "cursor-pointer w-full text-xl text-white font-medium bg-blue-500 shadow-lg shadow-blue-500/50 p-2 rounded" : "cursor-not-allowed w-full text-xl text-white font-medium bg-blue-200 shadow-lg shadow-blue-100 p-2 rounded"}`}>
            Create Account
          </button>
    </div>
  )
}

export default Registration;

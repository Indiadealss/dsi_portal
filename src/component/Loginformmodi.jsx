import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import Verify from "./Verify";
import {sentOtp} from "../../src/api/api"
import Registration from "./Registration";
import Emailregistration from "./Emailregistration";

const Loginformmodi = ({ closeModal }) => {
    
      const [mobile, setMobile] = useState('');
      const [password, setPassword] = useState("");
      const [regmobile,setRegmobile] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [name, setName] = useState("");
      const [emailreg,setEmailreg] = useState(false);
      const [registration,setRegistration] = useState(false);
      
      const [otpSent, setOtpSent] = useState(false);
      let mobileNo = `+91${mobile}`

      const handleSend = async () => {
        try{
            const res = await sentOtp(mobileNo);
            console.log("otp sent:",res.status);
            if(res.status === 200) {
              setOtpSent(true)
            }
            
        }catch(err) {
          console.error("Error sending OTP:", err);
          
        }
      };
      
  return (
    <>
    <div className={`${otpSent || registration || emailreg ? 'hidden' : 'block'}`}>
      <div className="flex">
        <h2><span className="text-2xl font-bold text-gray-700" style={{fontFamily:"sans-serif"}}>Login/Register</span></h2>
      </div>
          <div className="mb-3">
            <label className="block my-2 mb-5 text-sm font-normal text-gray-500 dark:text-white">Please enter your Phone Number</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Enter your phone number" />
          </div>
          <div className="flex justify-center mt-20">
          <button type="button" onClick={handleSend} disabled={mobile.length < 10} className={`${mobile.length > 9 ? "cursor-pointer w-full text-xl text-white font-medium bg-blue-500 shadow-lg shadow-blue-500/50 p-2 rounded" : "cursor-not-allowed w-full text-xl text-white font-medium bg-blue-200 shadow-lg shadow-blue-100 p-2 rounded"}`}>
            Continue
          </button>
          </div>
          <div>
            <div className="flex justify-between mt-2">
              <hr className="border-t border-gray-300 my-4 w-[42%]"/>
              <span className="text-gray-300 text-xl">Or</span>
              <hr className="border-t border-gray-300 my-4 w-[42%]"/>

            </div>

          </div>

          <div className="flex justify-center my-5">
          <button type="button" onClick={() => setEmailreg(true)} className="flex justify-center cursor-pointer w-full text-sm my-auto font-medium text-gray-700 border border-gray-300 font-normal bg-white p-2 rounded">
            <MdEmail className=" mx-4 text-3xl text-gray-500"/> <span className="my-auto">Continue With Email/Username</span>
          </button>
          </div>
          </div>
          <div className={`${!otpSent || registration ? 'hidden': 'block'}`}>
            <Verify mobile={mobile} changeotpsend={() => setOtpSent(false)} redirectTo={(e) => setRegistration(e)} resmobilef={(e) => setRegmobile(e)} closeModal={closeModal}/>
          </div>
          <div className={`${registration ? 'block': 'hidden'}`}>
              <Registration resMobile={regmobile} closeModal={closeModal}/>
          </div>
          <div className={`${emailreg  ? 'block' : 'hidden'}`}>
              <Emailregistration />
          </div>
    </>
  )
}

export default Loginformmodi
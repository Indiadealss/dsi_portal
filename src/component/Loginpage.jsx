import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import Verify from "./Verify";
import {sentOtp} from "../../src/api/api"
import Registration from "./Registration";
import Emailregistration from "./Emailregistration";
import EmailPick  from "../Images/material-icon-theme_google.png"
import loginBg from "../Images/loginPageimage.png";
import ReactCountryFlag from "react-country-flag";

const Loginpage = ({ closeModal }) => {
    
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
            // console.log("otp sent:",res.status);
            if(res.status === 200) {
              setOtpSent(true)
            }
            
        }catch(err) {
          console.error("Error sending OTP:", err);
          
        }
      };
      
  return (
   <div
  className="bg-cover bg-center  flex justify-center py-10"
  style={{ backgroundImage: `url(${loginBg})` }}
>
    <div className="w-[400px] mx-auto  shadow-xl rounded-xl  h-[max-content] bg-white p-[40px]">
    <div className={`${otpSent || registration || emailreg ? 'hidden' : 'block'}`}>
      <div className="flex">
        <h2 className="text-center mx-auto"><span className="text-2xl font-bold" style={{}}>Welcome Back</span></h2>
      </div>
          <div className="mb-3">
            <label className="block my-2 mb-5 text-sm font-normal text-gray-500 text-center">Login or signup in seconds to continue your property journey.</label>
            <label htmlFor="" className="text-xs">Mobile Number</label>
            {/* <input type="tel" value={mobile} maxLength={10} minLength={10} onChange={(e) => setMobile(e.target.value)} className="shadow-md border border-gray-100 text-gray-600 font-medium text-sm rounded block w-full p-2.5     outline-none" placeholder="Enter your phone number" /> */}
            <div className="flex items-center border border-gray-300  overflow-hidden bg-white rounded">
  
  {/* Country Code */}
  <div className="flex items-center gap-1 px-4 bg-white border-r border-gray-200">
    <ReactCountryFlag
    countryCode="IN"
    svg
    style={{
      width: "1em",
      height: "0.7em",
    }}
  />
    <span className="text-sm font-medium text-gray-700">+91</span>
  </div>

  {/* Input */}
  <input
    type="tel"
    placeholder="Enter mobile number" value={mobile} maxLength={10} minLength={10} onChange={(e) => setMobile(e.target.value)}
    className="w-full px-4 py-1 outline-none text-gray-700 placeholder:text-gray-400"
  />
</div>
          </div>
          <div className="flex justify-center mt-">
          <button type="button" onClick={handleSend} disabled={mobile.length < 10} className={`${mobile.length > 9 ? "cursor-pointer w-full text-xl text-white font-medium bg-blue-500  p-2 rounded" : "cursor-not-allowed w-full text-xl text-white font-medium bg-blue-200  p-2 rounded"}`}>
            Continue
          </button>
          </div>
          <div>
            <div className="flex justify-between mt-2">
              <hr className="border-t border-gray-300 my-4 w-[42%]"/>
              <span className="text-gray-300 text-xl">or</span>
              <hr className="border-t border-gray-300 my-4 w-[42%]"/>

            </div>

          </div>

          <div className="flex justify-center my-5">
          <button type="button" onClick={() => setEmailreg(true)} className="flex justify-center cursor-pointer w-full text-sm my-auto font-medium text-gray-700 border border-gray-300 font-normal bg-white p-2 rounded">
            <img src={EmailPick} alt="..." className="mx-4 text-3xl text-gray-500"/> <span className="my-auto">Continue With Email/Username</span>
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
              <Emailregistration closeEmail={() => setEmailreg(false)} />
          </div>
          </div>
    </div>
  )
}

export default Loginpage
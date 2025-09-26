import React, { useEffect, useState } from 'react';
import Inputforotp from './customcomponent/Inputforotp';
import { MdEdit } from "react-icons/md";
import { verifyOtp } from '../api/api';

const Verify = ({mobile}) => {
    const [timer,setTimer] = useState(30); //30 seconds countdown
    const [canResend,setCanResend] = useState(false);
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if(timer > 0){
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }
        else {
            setCanResend(true);
        }
    },[timer]);

    function handleOtpChange(value){
        setOtp(value);
    }

    let mobileNo = `+91${mobile}`;
    const handleVerify = async () => {
            try{
                const res = await verifyOtp(mobileNo,otp);
            }catch(err){
                console.error('Error verify OTP:',err);
                
            }
    }

  return (
    <>
        <div>
            <div >
        <h2><span className="text-2xl font-bold text-gray-700" style={{fontFamily:"sans-serif"}}>Verify your number</span></h2>
        <div className='mb-10 flex'><span className="text-2xl font-medium text-gray-700" style={{fontFamily:"sans-serif"}}>+91-{mobile}</span> <MdEdit className='m-1 text-xl text-blue-500 cursor-pointer' /></div>

      </div>

      {/* <div className="mb-3">
            <label className="block my-2 mb-5 text-sm font-normal text-gray-500 dark:text-white">Please enter your Phone Number</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Enter your phone number" />
          </div> */}
          <p className='my-2'>
          <span className='font-medium'>Enter your 4 digit OTP</span>
        </p>
          <Inputforotp length={4} onComplete={handleOtpChange}/>

          {canResend ? (
            <p>
          Haven't recived yet? <button  className='text-blue-600 cursor-pointer hover:unerline'>Resend OTP</button>
        </p>
          ) : (
            <p className="text-gray-500 text-sm">
          Haven't recived yet? wait {timer}s
        </p>
          )}

          <div className="flex justify-center mt-10">
          <button type="button" onClick={handleVerify} className={`${mobile.length > 9 ? "cursor-pointer w-full text-xl text-white font-medium bg-blue-500 shadow-lg shadow-blue-500/50 p-2 rounded" : "cursor-not-allowed w-full text-xl text-white font-medium bg-blue-200 shadow-lg shadow-blue-100 p-2 rounded"}`}>
            Verify & Continue
          </button>
          </div>
        </div>
    </>
  )
}

export default Verify
import React, { useState } from 'react'
import { register } from '../api/api';
import ReactCountryFlag from "react-country-flag";
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/userSlice';


const Registration = ({resMobile,closeModal}) => {
    const [name,setName] = useState("");
    const [city,setCity] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [inputLabel, setinputLabel] = useState('');
    const [email, setEmail] = useState("");

    const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(value);
  };

  const dispatch = useDispatch();

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
                  // alert("You have Register Succesfully");
                  // window.location.reload();
                  // dispatch(setUser(res.data.user));
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("user", JSON.stringify(res.data.user));
                  dispatch(setUser(res.data.user));
                  setAlert({
            message: `Welcome ${res.data.user.name}`,
            type: "success",
          });
          // window.location.reload();
          setTimeout(() => {
        setAlert(null);
        window.location.reload(); // optional
      }, 2000);
                  // window.location.reload()
                  console.log(res);
                  
                    if (closeModal) closeModal();
                }
                
            }catch(err) {
              console.error("Error sending OTP:", err);
              
            }
          };
  return (
    <div>
        <div className="flex">
        <h2 className='text-center mx-auto'><span className="text-2xl font-bold text-gray-700" >Sign up</span></h2>
      </div>
            <label className="block my-2 mb-5 text-sm font-normal text-gray-500 text-center">Login or signup in seconds to continue your property jounery.</label>
      <div className="my-5">
            <label className="block text-sm font-normal text-gray-500 ">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className=" border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5     outline-none" placeholder="Enter your full name" />
          </div>

          {/* Mobile Number */}

            <label className="block text-sm font-normal text-gray-500 ">Mobile Number</label>

          <div className="flex items-center border border-gray-300  overflow-hidden bg-white rounded">
            
            {/* Country Code */}
            <div className="flex items-center gap-1 px-4 bg-white border-r border-gray-200 py-2.5">
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
              placeholder="Enter mobile number" value={resMobile.slice(-10)} 
              className="w-full px-4 py-1 outline-none text-gray-700 placeholder:text-gray-400 p-5" disabled
            />
          </div>


          {/* Email ID */}
          <div className="mt-5">
            <label className="block text-sm font-normal text-gray-500 ">City (optional)</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className=" border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5     outline-none" placeholder="Enter your full name" />
          </div>
                      <label className="block text-sm font-normal text-gray-500 mt-5">E-mail</label>


          <div className="rounded border border-gray-300 mb-5">
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
          <button type="button" onClick={handleSend} disabled={!resMobile || resMobile.length < 10} className={`${!resMobile || resMobile.length > 9 ? "cursor-pointer w-full text-xl text-white font-medium bg-blue-500 shadow-lg shadow-blue-500/50 p-2 rounded" : "cursor-not-allowed w-full text-xl text-white font-medium bg-blue-200 shadow-lg shadow-blue-100 p-2 rounded"}`}>
            Create Account
          </button>

          <p className='text-xs'>By Clicking you agree to Our Terms</p>
    </div>
  )
}

export default Registration;

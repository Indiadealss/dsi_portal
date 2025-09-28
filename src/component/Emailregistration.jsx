import React, { useState } from 'react'

const Emailregistration = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [inputLabel, setinputLabel] = useState('');

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value === '') {
      setIsValid(false);
      setinputLabel('Email Id');
    } else if (validateEmail(value)) {
      setIsValid(true);
      setinputLabel('Email Id');
    } else {
      setIsValid(false);
      setinputLabel('That looks like an invalid email (ex: abc@xyz.com)');
    }
  };

  return (
    <div className="p-4">
      <h2>
        <span
          className="text-2xl font-bold text-gray-700"
          style={{ fontFamily: 'sans-serif' }}
        >
          Login/Register
        </span>
      </h2>

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
          onFocus={() => setinputLabel('Email Id')}
        />
      </div>

      <div className="flex justify-center mt-20">
        <button
          type="button"
          disabled={!isValid || email.length === 0}
          className={`${
            !isValid || email.length === 0
              ? 'cursor-not-allowed w-full text-xl text-white font-medium bg-blue-200 shadow-lg shadow-blue-100 p-2 rounded'
              : 'cursor-pointer w-full text-xl text-white font-medium bg-blue-500 shadow-lg shadow-blue-500/50 p-2 rounded'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Emailregistration;

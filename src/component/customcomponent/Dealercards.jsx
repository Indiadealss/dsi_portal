import React, { useEffect, useState } from "react";
import { getCampain } from "../../api/api";

const dealers = [
  {
    name: "INDIADEALSS",
    logo: "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/299496974O-1622789292915.jpeg",
    video: "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/299496974O-1622789292915.jpeg",
    reranumber:'',
    member:'Property Advisor',
    badges: ["RERA Registered", "Property Advisor"],
    number: '+91-7906518272'
  },
];


const DealerCards = ({campainadd}) => {
  
  
  
 console.log(campainadd);
 
     if(!campainadd){
      return <div>Loading</div>
     }
  return (
    <div className="w-full h-[136vw] md:h-[57vw] lg:h-[45vw] xl:h-[30vw]  py-6 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {campainadd.map((d, i) => (
        <div
          key={i}
          className="rounded-xl bg-red-300 bg-gradient-to-b from-slate-200/40 to-slate-50 shadow-lg flex flex-col justify-between"
          style={{backgroundImage:"url('https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/saller.svg')",backgroundSize:'cover'}}
        >
          {/* badges */}
          <div className="flex flex-col mb-4">
            <span
                className={d.rera ? "bg-yellow-600 w-40 text-white text-xs font-semibold px-3 py-1 my-2 whitespace-nowrap" : "hidden"}
              >
                RERA Registered
              </span>
              <span
                className={d.userType ? "bg-yellow-600 w-40 text-white text-xs font-semibold px-3 py-1 my-2 whitespace-nowrap" : "hidden"}
              >
                {d.userType}
              </span>
    
          </div>

          {/* Illustration */}
          <div className="relative ">
            <div className="w-16 h-16 absolute object-cover top-20 left-5 rounded-full bg-white shadow-md flex items-center justify-center">
              <img
                src={d.logo}
                alt={d.user_id.name}
                className="w-16 h-16 object-contain bg-white rounded-full"
              />
            </div>
          </div>

          {/* Name */}
          <div className="relative">
          <h4 className="text-center absolute object-cover top-14 left-2 text-SM font-semibold text-gray-800 mb-4">
            {d.user_id.name}
          </h4>
          </div>

          {/* Button */}
          <button className="w-[80%] mx-auto my-4 bg-white cursor-pointer hover:bg-blue-700 text-blue-500 py-2 rounded-xl font-medium transition">
            View Number
          </button>
        </div>
      ))}
    </div>
  );
};

export default DealerCards;

import React from 'react';
import { useEffect, useState } from "react";

const Custombanner = ({ setCustomEnquiry }) => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768); // mobile breakpoint
  };

  handleResize(); // initial check
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <div className="flex mt-10 items-center w-full min-h-screen bg-gray-200 p-">
      {/* Main Container */}
      <div className="relative w-full max-w-[1000px] h-[400px] md:h-[500px] bg-transparent shadow-2xl overflow-hidden flex">
        
       

        {/* LEFT SIDE: Content with Diagonal Cut */}
        <div 
          className="relative z-10 w-[100%] md:w-[65%] h-full bg-[#f3f3f3] flex flex-col p-5 lg:p-10"
          style={
    !isMobile
      ? { clipPath: "polygon(-20% 0, 100% 0, 80% 100%, 0% 100%)" }
      : {}
  }
        >
          {/* Logo/Save Badge */}
          <div className="flex flex-col items-center w-fit mb-6">
            <div className="bg-black p-1 border-2 border-dashed border-yellow-500">
              <div className="bg-black text-yellow-500 px-6 py-1 text-3xl font-black">
                Luxury 2, 3 & 4 BHK Apartments
              </div>
            </div>
            
          </div>

          {/* Main Headline */}
          <h2 className=" md:text-2xl md:text-3xl font-extrabold text-[#634b3d] leading-tight md:mb-12">
           <span className='text-sm md:text-2xl'>Starting Price – ₹ 1.81 Cr*</span>
           

          </h2>
          

          {/* Perks Grid (Top Row) */}
          <div className="hidden md:flex flex-col md:flex-row justify-between items-start text-center mb-10 pr-20">
            <div className="flex-1 px-2 border-r border-gray-400">
              <p className="text-[13px] font-bold text-gray-700">Car Parking<br />Charges Waived</p>
            </div>
            <div className="flex-1 px-2 border-r border-gray-400">
              <p className="text-[13px] font-bold text-gray-700">Club Membership<br />at no Additional Cost</p>
            </div>
            <div className="flex-1 px-2">
              <p className="text-[13px] font-bold text-gray-700">Zero Loan<br />Processing Fee</p>
            </div>
          </div>

          {/* Perks Grid (Bottom Row) */}
          <div className="hidden md:flex items-center gap-10 pr-20">
             <div className="flex-1 flex justify-end items-center gap-4 border-r border-gray-400 pr-10">
                <p className="text-right text-[13px] font-bold text-gray-700">Assured Gift On<br />Every Booking</p>
             </div>
             <div className="flex-1 flex items-center gap-4">
                <span className="text-3xl font-black text-gray-800">20 : 5</span>
                <p className="text-[11px] font-bold text-gray-600 leading-tight uppercase">Payment<br />Plan</p>
             </div>
          </div>

           <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button onClick={() => setCustomEnquiry(true)} className="bg-gradient-to-r from-[#7a553a] to-[#a3836a] hover:scale-105 transition-transform px-10 py-4 rounded-full font-bold text-sm uppercase shadow-xl cursor-pointer">
            Book Site Tour
          </button>
          <button onClick={() => setCustomEnquiry(true)} className="border-2 border-[#f0b100] backdrop-blur-sm hover:scale-105  transition-all px-10 py-4 rounded-full font-bold text-sm uppercase cursor-pointer text-[#f0b100]">
            Explore
          </button>
        </div>


          {/* Decorative Gold Line */}
          <div className="absolute top-0 right-[20%] w-1 h-full bg-gradient-to-b from-transparent via-yellow-600/30 to-transparent"></div>
        </div>

      </div>
    </div>
  );
};

export default Custombanner;
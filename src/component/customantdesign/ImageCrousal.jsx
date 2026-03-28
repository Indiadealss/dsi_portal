import React from "react";
import background2 from '../../Images/background-2.jpg'
import { Link } from "react-router-dom";

const ImageCrousal = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[360px]">
      
      {/* Background Image */}
      <img
        src={background2} // replace with your image path
        alt="banner"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        
        {/* Heading */}
        <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-semibold leading-snug max-w-3xl">
          <span className="text-white">Buy or sell your{" "}</span>
          <span className="text-lime-400">house</span> <span className="text-white">in few seconds with</span>
          <span className="text-white"> Brandsdoor</span>
        </h1>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          
          {/* Submit Button */}
          <Link to="/post-property"><button className="bg-lime-400 text-white px-6 py-3 rounded-full font-medium hover:bg-lime-500 transition cursor-pointer">
            POST PROPERTY
          </button></Link>

          {/* Browse Button */}
          <Link to="/property/allLocations-ffid"><button className="border border-lime-400 text-lime-400 px-6 py-3 rounded-full font-medium hover:bg-lime-400 hover:text-white transition cursor-pointer">
            BROWSE PROPERTIES
          </button></Link>

        </div>
      </div>
    </div>
  );
};

export default ImageCrousal;
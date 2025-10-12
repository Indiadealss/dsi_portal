import React, { useState } from "react";
import { useSelector } from "react-redux";

const Furnshingdetails = ({furnshingdetails, title,subtitle,rows}) => {

   const property = useSelector((state) => state.propertyid.data);

   if(!property || !property.furnishing || property.furnishing === 'Unfurnished'){
    return(
      <div className="hidden">
        N/A
      </div>
    )
   }
    
 

  return (
    
    <div className="py-4 border-b border-gray-300 overflow-x-auto">
        <h3><span className="text-gray-500 font-medium text-xl">{property.furnishing}</span></h3>
        <h4><span className="text-gray-400 font-normal">{subtitle}</span></h4>
    <div
  className="grid gap-4 py-2 "
  style={{ gridTemplateColumns: `repeat(${rows}, minmax(0, 1fr))` }}
>
  {furnshingdetails.map((item, index) => (
    <p key={index} className="text-center font-medium px-2">
      {item}
    </p>
  ))}
</div>
</div>

  );
};

export default Furnshingdetails;

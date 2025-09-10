import React, { useState } from "react";

const Furnshingdetails = ({furnshingdetails, title,subtitle,rows}) => {

   
    
 

  return (
    
    <div className="py-4 border-b border-gray-300 overflow-x-auto">
        <h3><span className="text-gray-500 font-medium text-xl">{title}</span></h3>
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

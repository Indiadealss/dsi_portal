import { IoIosAdd } from "react-icons/io";
import React from 'react';

export const Addfilterbutton = (props) => {
    

    let filterData = props.filterButtonname;
    
  return (
    <div className="flex flex-wrap my-5">
      {filterData.map((item,index) => {
        return(
            <div key={index}>
      <button type="button"  name={item.name} className="text-gray flex justify-between px-3 py-1  me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-[40px] border border-gray-300 outline-none">
        <span className="text-blue"><IoIosAdd className="mt-1 me-2 text-lg" /></span>
        {item.name}
        </button>
        </div>
        )})}
        </div>
  )
}

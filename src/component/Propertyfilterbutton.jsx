
import React from 'react';

export const Propertyfilterbutton = (props) => {
    
    console.log(props.propertyFilterButtonname);

    let filterData = props.propertyFilterButtonname;
    
  return (
    <div className="flex">
      {filterData.map((item,index) => {
        return(
            <div key={index}>
      <button type="button"  name={item.name} className="text-gray flex justify-between px-3 py-1  me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-[40px] border border-gray-300 outline-none">
        {item.name}
        </button>
        </div>
        )})}
        </div>
  )
}

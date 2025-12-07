import { IoIosAdd } from "react-icons/io";
import React from 'react';
import { RxCross2 } from "react-icons/rx";

export const Addfilterbutton = ({ filterButtonname, filterKey, selectedFilters, setSelectedFilters }) => {

      // console.log(filterButtonname);

  function handleSelect(name) {
    setSelectedFilters(prev => {
      const current = prev[filterKey] || [];

      

      return {
        ...prev,
        [filterKey]: current.includes(name)
          ? current.filter(i => i !== name)   // remove
          : [...current, name]                // add
      };
    });
  }

  return (
    <div className="flex flex-wrap my-5">
      {filterButtonname.map((item, index) => (
        <button
          key={index}
          onClick={() => handleSelect(item.name)}
          className={`px-3 py-1 me-2 mb-2 text-sm rounded-[40px] border flex items-center
            ${selectedFilters[filterKey]?.includes(item.name)
              ? "bg-blue-600 text-white border-blue-600 cursor-pointer"
              : "bg-white text-gray-900 border-gray-300 cursor-pointer"
            }`
          }
        >
          {selectedFilters[filterKey]?.includes(item.name)
          ? 
          <RxCross2 className="mr-2 text-lg" /> 
          :
          <IoIosAdd className="mr-2 text-lg" />
          }
          {item.name}
        </button>
      ))}
    </div>
  );
};

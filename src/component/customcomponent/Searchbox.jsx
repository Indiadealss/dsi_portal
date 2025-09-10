import React, { useState } from 'react'
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Custominputserchbox from '../customantdesign/Custominputserchbox';

const Searchbox = () => {
  const [active, setActive] = useState('buy');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filtername,setFiltername] = useState('All Residental');
  const [secondfiltername,setSecondFiltername] = useState('');

  const button = [
    { key: "buy", label: "Buy" },
    { key: "rent", label: "Rent" },
    { key: "newlaunch", label: "New Launch" },
    { key: "commercial", label: "Commercial" },
    { key: "plots/Land", label: "Plots/Land" },
    { key: "projects", label: "Projects" },
    { key: "postProperty", label: "Post Property" }
  ];

  const menuItems = [
    "Flat/Apartment",
    "Independent/Builder Floor",
    "Independent House/Villa",
    "Residential Land",
    "1 RK / Studio Apartment",
    "Farm House",
    "Other",
  ];

  function serchBtn(e){
    
    // console.log(e.currentTarget.name);
    if(e.currentTarget.name === 'buy' || e.currentTarget.name === 'rent'){
      setActive(e.currentTarget.name);
      setFiltername('All Residental');
      setSecondFiltername('');
    }else if(e.currentTarget.name === 'newlaunch'){
      setActive(e.currentTarget.name);
      setFiltername('Residental');
      setSecondFiltername('');
    }else if(e.currentTarget.name === 'commercial'){
      setActive(e.currentTarget.name);
      setFiltername('BUY');
      setSecondFiltername('All Commerical');
    }else if(e.currentTarget.name === 'plots/Land'){
      setActive(e.currentTarget.name);
      setFiltername('Residental');
      setSecondFiltername('');
    }else if(e.currentTarget.name === 'projects'){
      setActive(e.currentTarget.name);
      setFiltername('Residential Project');
      setSecondFiltername('');
    }
    else if(e.currentTarget.name === 'postProperty'){
      console.log(e.currentTarget.name);
    }
    
  }
  return (
    <>
      <div className="shadow-xl bg-white rounded-xl w-auto lg:w-[max-content] mx-auto z-11 relative">
        {/* Top Nav Buttons */}
        <div className='hidden lg:block lg:flex border-b border-b-gray-300'>
          {button.map((item) => (
            <button
              type='text'
              key={item.key}
              name={item.key}
              onClick={serchBtn}
              className={`${active === item.key
                ? 'mx-10 py-5 text-black font-bold border-b-4 border-[#022c6f] rounded cursor-pointer'
                : 'px-10 py-5 text-gray-500 font-medium  border-gray-300 cursor-pointer'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex relative z-10">
          <div className=" border-e border-gray-300 hidden lg:block">
            <button onClick={() => setShowDropdown(!showDropdown)} className='cursor-pointer border-none flex text-sm w-[max-content] font-medium text-gray-500 p-3'>
              All Residential <DownOutlined className='px-2' />
            </button>
          </div>
          <Custominputserchbox search='search' />
        </div>

        {/* Full-width Dropdown inside Searchbox */}
        {showDropdown && (
          <div className=" top-full left-0 w-full bg-white shadow-lg rounded-xl p-5 z-0">
            <div className="text-right me-6 cursor-pointer">
              <button className='text-[#022c6f] font-bold' onClick={() => setShowDropdown(false)}>Clear</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {menuItems.map((label, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className='text-xs font-medium text-gray-500'>{label}</span>
                </label>
              ))}
            </div>
            
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbox;

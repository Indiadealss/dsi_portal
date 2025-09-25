import React, { useState } from 'react'
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Custominputserchbox from '../customantdesign/Custominputserchbox';
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import { Rangeslider } from '../Rangeslider';
import { Addfilterbutton } from '../Addfilterbutton';
import { Link } from 'react-router';

const Searchbox = () => {
  const [active, setActive] = useState('buy');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [filtername, setFiltername] = useState('All Residental');
  const [buyCommercialtype, setBuyCommercialtype] = useState('Buy')

  const [searButton, setsearButton] = useState(true)
  const [secondfiltername, setSecondFiltername] = useState('');

  const [buttonName, setButtonName] = useState('');




  const button = [
    { key: "buy", label: "Buy" },
    { key: "rent", label: "Rent" },
    { key: "newlaunch", label: "New Launch" },
    { key: "commercial", label: "Commercial" },
    { key: "plots/Land", label: "Plots/Land" },
    { key: "projects", label: "Projects" },
    { key: "postProperty", label: "Post Property" }
  ];

  const noBedroom = [
    { name: '1RK' },
    { name: '2 BHK' },
    { name: '2 BHK' },
    { name: '2 BHK' },
    { name: '2 BHK' },
    { name: '2 BHK' },
  ]

  const constructionStatus = [
    { name: 'New launch' },
    { name: 'Under Construction' },
    { name: 'Ready to move' },
  ]

  const postedBy = [
    { name: 'Owner' },
    { name: 'Builder' },
    { name: 'Dealer' }
  ]

  const menuItems = [
    "Flat/Apartment",
    "Independent/Builder Floor",
    "Independent House/Villa",
    "Residential Land",
    "1 RK / Studio Apartment",
    "Farm House",
    "Other",
  ];

  const secondmenuItems = [
    "Ready to move",
    "Bare shell offices",
    "Shops & Retail",
    "Commercial/Inst.Land",
    "Agricultural/Farm Land",
    "Industrial Land/Plots",
    "Warehouse",
    "Cold Storage",
    "Factory & Manufacturing",
    "Hotel/Resorts",
    "Others"
  ]

  const investOptions = [
    "Pre Leased Spaces",
    "Food Courts",
    "Restaurants",
    "Multiplexes",
    "SCO Plots",
    "Co-working",
    "Business Center"
  ]

  const commericalPlotsLands = [
    "Agricultural/Farm Land ",
    "Industrial Plots/Land",
    "Commerical/Inst.Land"
  ]
  function serchBtn(e) {

    setShowDropdown(false);
    setShowDropdown2(false);

    // console.log(e.currentTarget.name);
    if (e.currentTarget.name === 'buy' || e.currentTarget.name === 'rent') {
      setActive(e.currentTarget.name);
      setFiltername('All Residental');
      setSecondFiltername('');
    } else if (e.currentTarget.name === 'newlaunch') {
      setActive(e.currentTarget.name);
      setFiltername('Residental');
      setSecondFiltername('');
    } else if (e.currentTarget.name === 'commercial') {
      setActive(e.currentTarget.name);
      setFiltername('BUY');
      setSecondFiltername('All Commerical');
    } else if (e.currentTarget.name === 'plots/Land') {
      setActive(e.currentTarget.name);
      setFiltername('Residental');
      setSecondFiltername('');
    } else if (e.currentTarget.name === 'projects') {
      setActive(e.currentTarget.name);
      setFiltername('Residential Project');
      setSecondFiltername('');
    }
    else if (e.currentTarget.name === 'postProperty') {
      console.log(e.currentTarget.name);
    }

  }

  const propertyTypes = [
    { name: 'officespace', label: 'Office Space' },
    { name: 'shop&retail', label: 'Shops & Retail' },
    { name: 'othercommercialspaces', label: 'Other Commercial spaces' },
    { name: 'factory&manfacturing', label: 'Factory & Manufacturing' }
  ]

  const officeTypes = [
    { name: 'readytomoveoffices', label: 'Ready to move offices' },
    { name: 'bareshalloffices', label: 'Bare Shall Offices' },
    { name: 'coworkingofficespace', label: 'Co-working office space' },
  ]

  function ShowDropDrown() {
    setShowDropdown2(false);
    setShowDropdown(!showDropdown);
    setsearButton(true);
    setButtonName('');
  }

  function ShowDropDrown2() {
    setShowDropdown(false);
    setShowDropdown2(!showDropdown2);
  }
  return (
    <>
      <div className="shadow-xl bg-white rounded-xl w-auto lg:w-[max-content] mx-auto z-11 relative">
        {/* Top Nav Buttons */}
        <div className='hidden lg:block lg:flex border-b border-b-gray-100'>
          {button.map((item) => (
            item.key === "postProperty" ? (
              <Link
                key={item.key}
                to="/post-property" // <-- put your route here
                className='py-6'
              >
                <span className={`${active === item.key
                  ? 'px-10 py-5 text-gray-500 font-medium  border-gray-300 cursor-pointer '
                  : 'px-10 py-5 text-gray-500 font-medium  border-gray-300 cursor-pointer '}`}>
                  {item.label}
                </span>
              </Link>
            ) : (
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
            )
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex relative z-10 searchBar">
          <div className=" border-e border-gray-100 hidden lg:block">
            <button onClick={ShowDropDrown} className='cursor-pointer border-none flex text-sm w-[max-content] font-medium text-gray-500 p-3'>
              {filtername} <span className={`${active === 'newlaunch' ? 'hidden' : ''}`}><DownOutlined className='px-2' /></span>
            </button>
          </div>
          <div className={`${(secondfiltername !== '' && buyCommercialtype !== 'invest') ? " border-e border-gray-100 hidden lg:block" : 'hidden'}`}>
            <button onClick={ShowDropDrown2} className='cursor-pointer border-none flex text-sm w-[max-content] font-medium text-gray-500 p-3'>
              {secondfiltername} <DownOutlined className='px-2' />
            </button>
          </div>
          <Custominputserchbox search='search' />
        </div>

        {/* Full-width Dropdown inside Searchbox */}

        {(active === 'buy' || active === 'rent' || active === 'commercial' || active === 'plots/Land' || active === 'projects') && showDropdown && (
          <div className=" top-full left-0 w-full bg-white shadow-lg opacity-100 rounded-xl p-5 z-0">
            <div className={`${active === 'buy' || active === 'rent' ? '' : 'hidden'}`}>
              <div className="text-right me-6 cursor-pointer">
                <button className='text-[#022c6f] font-bold' onClick={() => setShowDropdown(false)}>Clear</button>
              </div>
              <div className={`${!searButton ? 'hidden' : "grid grid-cols-3 gap-4 my-4"}`}>
                {menuItems.map((label, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className='text-xs font-medium text-gray-500'>{label}</span>
                  </label>
                ))}
              </div>

              <span className={`${active === 'buy' || active === 'rent' || active === 'projects' ? 'text-xs ps-4' : 'hidden'}`}>Looking for commercial properties? <span onClick={() => setActive('commercial')} className='text-blue-300 hover:text-blue-500 cursor-pointer'>click here</span></span>
              <span className={`${active === 'commercial' ? 'text-xs' : 'hidden'}`}>Looking for residental properties? <span onClick={() => setActive('buy')} className='text-blue-300 hover:text-blue-500 cursor-pointer'>click here</span></span>
              <div className='w-full border-b border-gray-100 mt-2'></div>
              <div className='flex mt-4'>
                <button type='button' name='budget' onClick={(e) => { setButtonName(e.target.name); setsearButton(false) }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2 flex h-[max-content]'>Budget <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='bedroom' onClick={(e) => { setButtonName(e.target.name); setsearButton(false); }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'>Bedroom <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='constructionstatus' onClick={(e) => { setsearButton(false); setButtonName(e.target.name) }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'>Construction Status <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='postedby' onClick={(e) => { setsearButton(false); setButtonName(e.target.name) }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'>Posted By <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
              </div>
              <div className={`${buttonName === 'budget' ? 'block mt-5' : 'hidden'}`}>
                <Rangeslider lethid={true} />
              </div>
              <div className={`${buttonName === 'bedroom' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Addfilterbutton filterButtonname={noBedroom} />
              </div>

              <div className={`${buttonName === 'constructionstatus' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Addfilterbutton filterButtonname={constructionStatus} />
              </div>

              <div className={`${buttonName === 'postedby' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Addfilterbutton filterButtonname={postedBy} />
              </div>
            </div>
            <div className={`${active === 'commercial' ? 'block' : 'hidden'}`}>
              <div className="flex justify-evenly">
                <div className="flex items-center">
                  <input
                    id="Buy"
                    type="radio"
                    name="commercial-type"
                    value="buy"
                    checked={buyCommercialtype === "buy"}
                    onChange={(e) => setBuyCommercialtype(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 outline-none border-gray-300"
                  />
                  <label
                    htmlFor="Buy"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Buy
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="Lease"
                    type="radio"
                    name="commercial-type"
                    value="lease"
                    checked={buyCommercialtype === "lease"}
                    onChange={(e) => setBuyCommercialtype(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                  />
                  <label
                    htmlFor="Lease"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Lease
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="Invest"
                    type="radio"
                    name="commercial-type"
                    value="invest"
                    checked={buyCommercialtype === "invest"}
                    onChange={(e) => setBuyCommercialtype(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                  />
                  <label
                    htmlFor="Invest"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Invest
                  </label>
                </div>
              </div>

              <div className='w-full border border-gray-100 my-4'></div>
              <div className='flex mt-4'>
                <button type='button' name='budget' onClick={(e) => { setButtonName(e.target.name); setsearButton(false) }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2 flex h-[max-content]'>Budget <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='area' onClick={(e) => { setButtonName(e.target.name); setsearButton(false); }} className={`${buyCommercialtype === 'invest' ? 'hidden':'border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'}`}>Area <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='constructionstatus' onClick={(e) => { setsearButton(false); setButtonName(e.target.name) }} className={`${(buyCommercialtype === 'lease' || buyCommercialtype === 'invest') ? 'hidden':'border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'}`}>Construction Status <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='postedby' onClick={(e) => { setsearButton(false); setButtonName(e.target.name) }} className={`${buyCommercialtype === 'invest' ? 'hidden':'border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'}`}>Posted By <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
              </div>
              <div className={`${buttonName === 'budget' ? 'block mt-5' : 'hidden'}`}>
                <Rangeslider lethid={true} />
              </div>
              <div className={`${buttonName === 'area' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Rangeslider lethid={true} />
              </div>

              <div className={`${buttonName === 'constructionstatus' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Addfilterbutton filterButtonname={constructionStatus} />
              </div>

              <div className={`${buttonName === 'postedby' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Addfilterbutton filterButtonname={postedBy} />
              </div>
            </div>
            <div className={`${active === 'plots/Land' ? 'block' : 'hidden'}`}>
              <div className='flex'>
                <div class="flex items-center mx-4">
                  <input checked id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 outline-none  border-gray-300   dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-4" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Residential Plots/Land</label>
                </div>
                <div class="flex items-center mx-4">
                  <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lease</label>
                </div>
              </div>
              <div>
                <div className={`${!searButton ? 'hidden' : "grid grid-cols-3  my-4"}`}>
                  {commericalPlotsLands.map((label, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className='text-xs font-medium text-gray-500'>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className='w-full border border-gray-100 my-4'></div>
              <div className='flex mt-4'>
                <button type='button' name='budget' onClick={(e) => { setButtonName(e.target.name); setsearButton(false) }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2 flex h-[max-content]'>Budget <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='area' onClick={(e) => { setButtonName(e.target.name); setsearButton(false); }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'>Area <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='postedby' onClick={(e) => { setsearButton(false); setButtonName(e.target.name) }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'>Posted By <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
              </div>
              <div className={`${buttonName === 'budget' ? 'block mt-5' : 'hidden'}`}>
                <Rangeslider lethid={true} />
              </div>
              <div className={`${buttonName === 'area' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Rangeslider lethid={true} />
              </div>

              <div className={`${buttonName === 'postedby' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Addfilterbutton filterButtonname={postedBy} />
              </div>



            </div>

            <div className={`${active === 'projects' ? 'block' : 'hidden'}`}>
              <div className={`${!searButton ? 'hidden' : "grid grid-cols-3  my-4"}`}>
                {commericalPlotsLands.map((label, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className='text-xs font-medium text-gray-500'>{label}</span>
                  </label>
                ))}
              </div>
              <span className={`${active === 'buy' || active === 'rent' || active === 'projects' ? 'text-xs ps-4' : 'hidden'}`}>Looking for commercial properties? <span onClick={() => setActive('commercial')} className='text-blue-300 hover:text-blue-500 cursor-pointer'>click here</span></span>
              <div className='w-full border-b border-gray-100 mt-2'></div>
              <div className='flex mt-4'>
                <button type='button' name='budget' onClick={(e) => { setButtonName(e.target.name); setsearButton(false) }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2 flex h-[max-content]'>Budget <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='bedroom' onClick={(e) => { setButtonName(e.target.name); setsearButton(false); }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'>Bedroom <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
              </div>
              <div className={`${buttonName === 'budget' ? 'block mt-5' : 'hidden'}`}>
                <Rangeslider lethid={true} />
              </div>
              <div className={`${buttonName === 'bedroom' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Addfilterbutton filterButtonname={noBedroom} />
              </div>

            </div>

          </div>
        )}

        {(active === 'commercial' && buyCommercialtype !== 'invest') && showDropdown2 && (
          <div className=" top-full left-0 w-full bg-white shadow-lg rounded-xl p-5 z-0">

            <div className='flex justify-between'>
              <div className={`${buyCommercialtype !== 'buy' ? 'hidden' : "grid grid-cols-2 gap-4 my-4 w-[50%]"}`}>
                {secondmenuItems.map((label, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className='text-xs font-medium text-gray-500'>{label}</span>
                  </label>
                ))}
              </div>
              <div className={`${buyCommercialtype === 'buy' ? 'grid grid-cols-2 gap-2 my-4 w-[40%]' : 'hidden'}`}>
                <div >
                  <span className='text-sm font-medium text-blue-900'>Investment Options</span>
                  <div className={`${!searButton ? 'hidden' : "grid grid-cols-1 gap-4 my-4 h-[10vw] overflow-auto"}`}>
                    {investOptions.map((label, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span className='text-xs font-medium text-gray-500'>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-right me-6 cursor-pointer">
                    <button className='text-[#022c6f] font-bold' onClick={() => setShowDropdown2(false)}>Clear</button>
                  </div>
                </div>
              </div>
              <div className={`${buyCommercialtype === 'lease'? 'my-3':'hidden'}`}>
                <div >
                  <span>Property Types</span>
                  <div className="flex">
                    {propertyTypes.map((item) => {
                      return (
                        <div class="flex items-center p-3 outline-none">
                          <input checked id={item.name} type="radio" value="" name="default-radio" class="outline-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 " />
                          <label for="default-radio-3" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.label}</label>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className='my-3'>
                  <span>office space type <sup className='text-red-500 font-medium text-sm mt-4'>*</sup></span>
                  <div className="flex">
                    {officeTypes.map((item) => {
                      return (
                        <div class="flex items-center p-3 outline-none">
                          <input checked id={item.name} type="radio" value="" name="default-radio" class="outline-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 " />
                          <label for="default-radio-3" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.label}</label>
                        </div>
                      )
                    })}
                  </div>
                </div>
             

            <span className={`${active === 'buy' || active === 'rent' || active === 'projects' ? 'text-xs ps-4' : 'hidden'}`}>Looking for commercial properties? <span onClick={() => setActive('commercial')} className='text-blue-300 hover:text-blue-500 cursor-pointer'>click here</span></span>
            <span className={`${active === 'commercial' ? 'text-xs' : 'hidden'}`}>Looking for residental properties? <span onClick={() => setActive('buy')} className='text-blue-300 hover:text-blue-500 cursor-pointer'>click here</span></span>
            <div className='w-full border-b border-gray-200 mt-2'></div>
            <div>
              <div className="flex mt-2">
                <p><span className='text-[7px] tracking-wider px-[2px] bg-red-500 font-medium rounded-xs text-white '>NEW</span></p>
                <p className='px-4'><span className='font-medium text-base text-gray-700'>Looking to invest?</span> <span className='text-blue-400 font-normal text-base'>Click here</span></p>
              </div>
              <div className='flex mt-4 px-8'>
                <button type='button' name='budget' onClick={(e) => { setButtonName(e.target.name); setsearButton(false) }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2 flex h-[max-content]'>Budget <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='area' onClick={(e) => { setButtonName(e.target.name); setsearButton(false) }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'>Area <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
                <button type='button' name='postedby' onClick={(e) => { setsearButton(false); setButtonName(e.target.name) }} className='border border-gray-300 bg-none rounded-xl cursor-pointer px-3 mx-2  flex h-[max-content]'>Posted By <span className='my-[4px] ms-[4px] text-xl font-normal'><IoIosArrowDown /></span></button>
              </div>
              <div className={`${buttonName === 'budget' ? 'block mt-5' : 'hidden'}`}>
                <Rangeslider lethid={true} />
              </div>
              <div className={`${buttonName === 'area' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Rangeslider lethid={true} />
              </div>

              <div className={`${buttonName === 'postedby' ? 'flex mt-5 mx-10' : 'hidden'}`}>
                <Addfilterbutton filterButtonname={postedBy} />
              </div>
            </div>
             </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Searchbox;

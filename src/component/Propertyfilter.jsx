import React, { useRef, useState } from "react";
import Filterbutton from './Filterbutton'
import { GoChevronDown } from "react-icons/go";
import { Rangeslider } from './Rangeslider';
import { Addfilterbutton } from './Addfilterbutton';
import { MdFilterAlt } from "react-icons/md";
import { Checkfilter } from './Checkfilter';
import { Propertyfilterbutton } from './Propertyfilterbutton';
import { PropertiesData } from './PropertiesData';

export default function Propertyfilter() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const budgetRef = useRef(null);
  const bedroom = useRef(null);
  const propertytype = useRef(null);
  const avalablefor = useRef(null);
  const postedby = useRef(null);
  const furnishingstatus = useRef(null);
  const localiti = useRef(null);
  const newproject = useRef(null);
  const bathroom = useRef(null);
  const anemate = useRef(null);
  const area = useRef(null);
  const availblefrom = useRef(null);
  const ageofproperty = useRef(null);




  const noBedroom = [
    { name: '1RK' },
    { name: '2 BHK' },
    {name:'3 BHK'},
    {name:'4 BHK'}
  ]
  const propertyType = [
    { name: 'Residential Apartment' },
    { name: 'Independent/Bulder Floor' },
    { name: 'Resident Land' },
    { name: 'Independent House/Villa' },
    { name: 'Farm House' },
    { name: '1 RK/ Studio Apartment' },
  ]
  const availableFor = [
    { name: 'Family' },
    { name: 'Single Women' },
    { name: 'Single Men' },
    { name: 'Tenants With Company Lease' }
  ]

  const postedBy = [
    { name: 'Owner' },
    { name: 'Builder' },
    { name: 'Dealer' },
    { name: 'Feature Dealer' }
  ]

  const furnishingStatus = [
    { name: 'Semifurnished' },
    { name: 'Furnished' },
    { name: 'Unfurnished' }
  ]

  const noBathroom = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
  ]

  const amenitiesFilter = [
    { name: 'Parking' },
    { name: 'Park' },
    { name: 'Power Backup' },
    { name: 'Vaastu Compliant' },
    { name: 'Lift' },
    { name: 'Gymnasium' },
    { name: 'Club house' },
    { name: 'Swimming Pool' },
    { name: 'Gas Pipeline' },
    { name: 'Security Personal' },
    { name: 'Pet Friendly' },
    { name: 'Wheelchair Friendly' },
    { name: 'AC Room' },
    { name: 'Food Service' },
    { name: 'Wifi' },
    { name: 'Laundry Available' }
  ]

  const localtiesCheck = [
    { name: 'Dwarka' },
    { name: 'Sector 19 Dwarka' },
    { name: 'Sector 23 Dwarka' },
    { name: 'Saket' }
  ]
  const projectSocities = [
    { name: 'Golf Link DDA Apartment' },
    { name: 'DDA Flats Sector 14' },
    { name: 'DDA Shaheed Bhagat Singh Apartment' },
    { name: 'DDA Sun View Apartment' },
    { name: 'DDA Akshardham Apartment' }
  ]

  const availableFrom = [
    { name: 'Any Time' },
    { name: 'Immediately' },
    { name: 'Within 1 Month' },
    { name: 'After 1 Month' },
    { name: 'Within 3 Months' },
    { name: 'After 3 Months' }
  ]

  const propertyAge = [
    { name: '0-1 years old' },
    { name: '1-5 years old' },
    { name: '5-10 years old' },
    { name: '10+ years old' },
    { name: '20+ years old' }
  ]
  const propertyFilterButton = [
    { name: 'Owner' },
    { name: 'Verified' },
    { name: 'Furnished' },
    { name: 'With Photos' },
    { name: 'With Videoes' }
  ]

  const MobilepropertyFileterButton = [
    { name: 'Budget' },
    { name: 'No of Bedrooms' },
    { name: 'Property Types' },
    { name: 'Availabe for' },
    { name: 'Posted by' },
    { name: 'furnishing status' },
    { name: 'Owner' },
    { name: 'Verified' },
    { name: 'Furnished' },
    { name: 'With Photos' },
    { name: 'With Videoes' }
  ]

  const propertyFilterData = [
    { title: 'Hide already seen', data: 'input', name: 'alreadySeen' },
    { title: 'Budget', data: 'Rangeslider', name: 'budget', useref: useRef(null) },
    { title: 'No. of Bedrooms', data: noBedroom, name: 'noOfBedroom', useref: useRef(null) },
    { title: 'Types of Property', data: propertyType, name: 'typesOfProperty', useRef: useRef(null) },
    { title: 'Avalable For', data: availableFor, name: 'avalableFor', useref: useRef(null) },
    { title: 'Posted by', data: postedBy, name: 'postedby', useRef: useRef(null) },
    { title: 'Furnishing Status', data: furnishingStatus, name: 'furnishingStatus', useRef: useRef(null) },
    { title: 'Localities', data: localtiesCheck, name: 'localities', useref: useRef(null) },
    { title: 'New Projects/Societies', data: projectSocities, name: 'newProject', useref: useRef(null) },
    { title: 'No of Bathrooms', data: noBathroom, name: 'noBathroom', useref: useRef(null) },
    { title: 'Anemate', data: amenitiesFilter, name: 'anemateFilter', useref: useRef(null) },
    { title: 'Properties With Photos', data: 'input' },
    { title: 'Area', data: 'Rangeslider', name: 'area', useref: useRef(null) },
    { title: 'Availblefrom', data: availableFrom, name: 'availblefrom', useref: useRef(null) },
    { title: 'Verified Properties', data: 'input', name: 'verified properties' },
    { title: 'Age of Property', data: propertyAge, name: 'Age of Property', useref: useRef(null) },
  ]

  function mobilFilterOpen(e){
    if(propertyFilterData[e.currentTarget.dataset.key].data != 'input' ){
    setIsMobileOpen(true);
    setMobileOpenIndex(e.currentTarget.name);
    } else{
      setMobileOpenIndex('');
    }
  }
  const [openItems, setOpenItems] = useState(
    propertyFilterData.reduce((acc, _, index) => {
      acc[index] = true;   // every index is open initially
      return acc;
    }, {})
  );

  const [openMobileIndex, setMobileOpenIndex] = useState('');

  const handleToggle = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index], // toggle only this one
    }));
  };

  return (
    <div className="sticky top-0">
      {/* Desktop Sidebar */}
      <aside className=" propertyListingFilter hidden md:block  p-2 space-y-6 bg-white">
        {/* <div>
          <h2 className="font-semibold text-lg mb-2">Type of property</h2>
          <div className="space-y-2">
            <label className="block">
              <input type="radio" name="type" defaultChecked /> Residential Apartment
            </label>
            <label className="block">
              <input type="radio" name="type" /> Residential Land
            </label>
            <label className="block">
              <input type="radio" name="type" /> Independent House/Villa
            </label>
            <label className="block">
              <input type="radio" name="type" /> Builder Floor
            </label>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">No. of Bedrooms</h2>
          <div className="flex flex-wrap gap-2">
            {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"].map((b, i) => (
              <button
                key={i}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                {b}
              </button>
            ))}
          </div>
        </div> */}
        <div className=' size-fit lg:flex'>
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8  ">
            <div className="flex items-center justify-between mb-4">
              <h5 className=" font-samibold leading-none text-gray-900 ">Apply Filters</h5>
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline ">
                Clear all
              </a>
            </div>
            <Filterbutton btname="1bhk" />
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200 ">
                {propertyFilterData.map((item, index) => {
                  return (
                    <li key={index} className="py-3 sm:py-4">
                      {/* HEADER SECTION */}
                      {item.data === "input" ? (
                        <div className="mt-2 flex justify-between items-center" >
                          <h3 className="font-semibold">{item.title}</h3>
                          {/* toggle switch */}
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 "></div>
                          </label>
                        </div>
                      ) : (
                        <div
                          className="mt-2 flex justify-between items-center cursor-pointer"
                          onClick={() => handleToggle(index)}
                        >
                          <h3 className="font-semibold">{item.title}</h3>
                          <GoChevronDown
                            className={`transform transition-transform duration-300 ${openItems[index] ? "rotate-180" : ""
                              }`}
                          />
                        </div>
                      )}

                      {/* BODY SECTION (all open initially, toggle individually) */}
                      {openItems[index] && (
                        <div className="mt-2">
                          {item.data === "Rangeslider" && <Rangeslider />}
                          {Array.isArray(item.data) && (
                            <Addfilterbutton filterButtonname={item.data} />
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

            </div>
          </div>

        </div>
      </aside>

      {/* Mobile Button */}
      <button
        className="md:hidden h-[fit-content]  px-2 py-1 m-5 text-sm bg-blue-600 text-white rounded-lg shadow-lg"
        onClick={() => setIsMobileOpen(true)}
      >
        <MdFilterAlt />
      </button>
      <div className='md:hidden flex justify-between my-5 overflow-hidden'>
        <div className='overscroll-none overflow-auto'>
          <div className='static lg:hidden'>
            <div className="flex">
              {propertyFilterData.map((item, index) => {
                return (
                  <div key={index}>
                    <button type="button" data-key={index} name={item.name} onClick={mobilFilterOpen} className="text-gray w-[max-content] flex justify-between px-3 py-1  me-2 mb-2 text-xs font-medium text-gray-900 bg-white rounded-xl border border-gray-300 outline-none">
                      {item.title}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div>
          <div className='flex w-[10vw] justify-around hidden'>
            <h5>Short By</h5>

          </div>
        </div>
      </div>


      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
          <div className="bg-white w-full h-full p-0 overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setIsMobileOpen(false)}>✕</button>
            </div>

            {/* Under Construction Filter */}
            <div className="flex">
              {/* LEFT SIDE LIST */}
              <div className="mb-6 size-fit w-[35vw] flex bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8  ">
                <div className="w-full max-w-md p-2">
                  <div className="flow-root">
                    <div className="flex">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200  w-30"
                      >
                        {propertyFilterData.map((item, index) => (
                          <li
                            key={index}
                            className={`${item.data === "input" ? "hidden" : "py-3 flex sm:py-4 cursor-pointer"
                              }`}
                            onClick={() => setMobileOpenIndex(item.name)}
                          >
                            <div className="flex justify-between">
                              <h3 ><span className="text-xs font-normal">{item.title}</span></h3>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE CONTENT */}
              <div className="flex-1 p-6">
                {propertyFilterData.map((item, index) => (
                  <div
                    key={index}
                    name={item.name}
                    className={`${item.name === openMobileIndex ? "block" : "hidden"}`}
                  >
                    <h3 className="text-lg font-semibold">{item.title}</h3>

                    {/* You can render details here */}
                    {item.data === "Rangeslider" && <Rangeslider />}
                    {Array.isArray(item.data) && (
                      <Addfilterbutton filterButtonname={item.data} />
                    )}
                  </div>
                ))}
              </div>
            </div>


            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-between">
              <button className="px-4 py-2 border rounded">Clear all</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                See All Properties
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react'
import { GoChevronDown } from "react-icons/go";
import { Rangeslider } from './Rangeslider';
import { Addfilterbutton } from './Addfilterbutton';
import { Checkfilter } from './Checkfilter';
import { Propertyfilterbutton } from './Propertyfilterbutton';
import { PropertiesData } from './PropertiesData';
import { useRef } from 'react';
import Propertyfilter from './Propertyfilter';
export const Property = () => {

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

  const handleToggle = (ref) => {
    if (ref.current) {
      ref.current.classList.toggle('hidden');
    }
  };
  const noBedroom = [
    { name: '1RK' },
    { name: '2 BHK' },
    { name: '2 BHK' },
    { name: '2 BHK' },
    { name: '2 BHK' },
    { name: '2 BHK' },
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

  return (
    <section>
      <div className='relative block lg:flex'>

        <Propertyfilter />
        <div className='w-full lg:w-[70vw]'>

          <div className='overflow-auto'>
            <div className='flex justify-between my-5 overflow-hidden'>
              <div className='overscroll-none overflow-auto'>
                <div className="hidden lg:block  lg:relative">
                  <div className="flex">
                    {propertyFilterButton.map((item, index) => {
                      return (
                        <div key={index}>
                          <button type="button" name={item.name} className="text-gray flex justify-between px-3 py-1  me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-[40px] border border-gray-300 outline-none">
                            {item.name}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div>
                <div className='flex w-[10vw] justify-around'>
                  <h5>Short By</h5>
                  <GoChevronDown className='mt-2' />
                </div>
              </div>
            </div>
            <PropertiesData />
          </div>
        </div>
      </div>
    </section>
  )
}

import React, { useState } from 'react'
import { MdAutorenew } from "react-icons/md";

const Listingboost = () => {

    const projectName = 'Sector 127'
    const head = `Uh-oh! ${projectName} Noida has tough competition! Here's a summary`;
    const NoofListings = 1460;
    const NoofAdvertises = 75;
    const BoostUsedBy = 91;
    const AverageBoost = 115;
    const oneListingCost = 372;
    const threeListingCost = 1116;
    const fiveListingCost = 1860;
    const [creadits,setCreadits] = useState(null);
    const [inputLabel,setinputLabel] = useState('Enter credit value');
    const today = new Date();
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      const formattedDate = today.toLocaleDateString(undefined, options); // Formats according to user's locale
  return (
    <div className='px-10'>
      <div className='border border-gray-300 p-4 rounded mt-5'>
        <p><span>{head}</span></p>
        <div className="flex justify-around">
            <div>
                <p><span>No of Listings</span></p>
                <h2><span>{NoofListings}</span></h2>
            </div>
            <div>
                <p><span>No of Advertisers</span></p>
                <h2><span>{NoofAdvertises}</span></h2>
            </div>
            <div>
                <p><span>Boost Used By</span></p>
                <h2><span>{NoofAdvertises}/{BoostUsedBy}</span></h2>
            </div>
            <div>
                <p><span>Average Boost VALUE</span></p>
                <h2><span>{AverageBoost}</span></h2>
            </div>
        </div>
      </div>
      <div className='mt-5'>
        <p><span>Boost your listing</span></p>
        <div className="flex justify-around">
            <div className='flex border border-gray-300 h-[80%] rounded p-2 mt-5 w-[10vw] justify-around'>
                <input type='radio' name='list' id='defalut' className='rounded-full h-10 cursor-pointer' />
                <div>
                    <p><span>1 Listing</span></p>
                    <p><span>{oneListingCost}</span></p>
                </div>

            </div>
            <div className='flex border border-gray-300 h-[80%] rounded p-2 mt-5 w-[10vw] justify-around'>
                <input type='radio' name='list' id='defalut' className='rounded-full h-10 cursor-pointer' />
                <div>
                <p><span>3 Listing</span></p>
                <p><span>{threeListingCost}</span></p>
                </div>
            </div>
            <div className='flex border border-gray-300 h-[80%] rounded p-2 mt-5 w-[10vw] justify-around'>
                <input type='radio' name='list' id='defalut' className='rounded-full h-10 cursor-pointer' />
                <div>
                <p><span>5 Listing</span></p>
                <p><span>{fiveListingCost}</span></p>
                </div>
            </div>
            <div>
                <p><span>or, Choose your credits</span></p>
                <div className="rounded border border-gray-300">
        <div
          className='text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'
        >
          <span>{inputLabel}</span>
        </div>

        <input
          type="number"
          value={creadits}
          onChange={(e) => setCreadits(e.currentTarget.value)}
          className="w-full p-2 rounded-b outline-none"
          placeholder='0'
        />
      </div>
            </div>
        </div>
      </div>
      <div className='flex justify-around mt-10 rounded-lg bg-gray-100 p-10'>
        <div className='w-[40%]'>
            <h2><span>Auto-Extend</span></h2>
            <p><span>save time & efforts</span></p>
            <p><span>Activate now and pay on the day of extension You are always in control, disable anytme</span></p>
        </div>
        <div className='shadow-md w-[48%] bg-white rounded-lg p-3'>
            <p><span className='flex my-2'>Choose <MdAutorenew className='mt-1 mx-1 text-blue-500' /> auto-extend duration</span></p>
            <div className='flex justify-between'>
            <div className='border border-gray-300 p-2 rounded'>
                <input type='radio' name='extend' id='defalut' className='rounded-full cursor-pointer' />
                <p style={{fontSize:"0"}}><span className='text-[10px] font-medium'>Add 2 months</span></p>
                <p style={{fontSize:"0"}}><span className='text-[10px]'>Listing live till{formattedDate}</span></p>
            </div>
            <div className='border border-gray-300 p-2 rounded'>
                <input type='radio' name='extend' id='defalut' className='rounded-full cursor-pointer' />
                <p style={{fontSize:"0"}}><span className='text-[10px] font-medium'>Add 2 months</span></p>
                <p style={{fontSize:"0"}}><span className='text-[10px] '>Listing live till{formattedDate}</span></p>
            </div>
            <div className='border border-gray-300 p-2 rounded'>
                <input type='radio' name='extend' id='defalut' className='rounded-full cursor-pointer' />
                <p style={{fontSize:"0"}}><span className='text-[10px] font-medium'>Add 2 months</span></p>
                <p style={{fontSize:"0"}}><span className='text-[10px] '>Listing live till{formattedDate}</span></p>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Listingboost;

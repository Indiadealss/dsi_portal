import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";

const Banner = () => {

    const options = [
        "Newest First",
        "Expiring Last",
        "Oldest First",
        "Expiring First"
    ];

    const numberofActiveProduct = 0;

    const [newest,setNewest] = useState('')
    return (
        <div>
            <div className='flex justify-between px-5 border-b-2 p-3 border-gray-300'>
                <div>
                    <span className='text-xs cursor-default'>ACTIVATION STATUS</span>
                    <div className='flex'>
                        <span className='text-xs px-3  border-e cursor-pointer text-gray-600'>ALL</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Active</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Reported</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Undersreening</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Expired</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Deleted</span>
                    </div>
                </div>
                <div>
                    <div className='flex'>
                        <CiSearch className='mt-3'/>
                    <input type="text" className='text-gray-700 border-b mt-2 outline-none' placeholder='Enter Locality'  />
                    </div>
                </div>
                <div>
                    <p><span className='text-gray-500 font-light text-sm'>SORT</span></p>
                    <select
                        className="border rounded px-1 py-1 cursor-pointer text-sm"
                        value={newest}
                        onChange={(e) => setNewest(e.target.value)}
                    >
                        {options.map((opt) => (
                            <option key={opt} className='cursor-pointer'>{opt}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Active products in Banner */}

             <div className='shadow-md w-[96%] m-3 p-2 border border-gray-300 rounded'>
            <span className='font-medium text-sm'>{numberofActiveProduct} Active Products</span> 
        </div>
        </div>
    )
}

export default Banner

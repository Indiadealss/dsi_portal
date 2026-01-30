import React from 'react'
import { useState } from 'react';
import { DealerCard } from '../customantdesign/Productsdesign';

const Allproducts = () => {

     const options = [
        "Newest First",
        "Expiring Last",
        "Oldest First",
        "Expiring First"
    ];

    const ListingsOption = [
        "Listings",
        "Projects"
    ]

        const [newest,setNewest] = useState('')
        const [Listings,setListings] = useState('')

        const numberofActiveProduct = 0

        

        const data = {
  dealingIn: "Sale of Residential & Commercial",
  postedOn: "24 May 2019",
  expiryOn: "NA",
  summaryViews: 401,
  detailViews: 32,
  clickToViews: 0,
  campaignType: "Locate a Dealer (Free)",
  status: "Active",
};

  return (
    <div>
      <div className='flex justify-between px-5 border-b-2 p-3 border-gray-300'>
            <div>
                <span className='text-xs cursor-default'>ACTIVATION STATUS</span>
                <div className='flex'>
                <span className='text-xs px-3  border-e cursor-pointer text-gray-600'>ALL</span>
                <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Active</span>
                <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Reported</span>
                <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Underscreening</span>
                <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Expired</span>
                <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Deleted</span>
            </div>
            </div>
            <div>
                <span className='cursor-default text-xs text-right font-medium'>Short</span><br />
                <select
                        className=" rounded px-1 py-1 cursor-pointer text-sm outline-none"
                        value={newest}
                        onChange={(e) => setNewest(e.target.value)}
                    >
                        {options.map((opt) => (
                            <option key={opt} className='cursor-pointer outline-none'>{opt}</option>
                        ))}
                    </select>
            </div>
            <div>
                <span className='cursor-default text-xs text-right font-medium'>Listing/Projects</span><br />
                <select
                        className=" rounded px-1 py-1 cursor-pointer text-sm outline-none"
                        value={Listings}
                        onChange={(e) => setListings(e.target.value)}
                    >
                        {ListingsOption.map((opt) => (
                            <option key={opt} className='cursor-pointer border-none outline-none'>{opt}</option>
                        ))}
                    </select>
            </div>
            
        </div>

        <div className='ms-5'>
        <div className='shadow-md w-[96%] m-3 p-2 border border-gray-300 rounded'>
            <span className='font-medium text-sm'>{numberofActiveProduct} Active Products</span> 
        </div>

        {/* Campain Dealear */}

        <DealerCard item={data} />

        {/* displaying */}

        <div className='hidden'>
            <span>Displaying  {numberofActiveProduct}</span>
        </div>
        </div>
    </div>
  )
}

export default Allproducts

import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';

const Allresponse = () => {


    const [newest, setNewest] = useState()

    const getDynamicOptions = () => {
        const now = new Date();

        const formatMonth = (date) =>
            date.toLocaleString("en-US", { month: "short", year: "numeric" });

        return [
            "Last 6 Months",
            "Last 90 Days",
            "Last 30 Days",

            // Current month
            formatMonth(new Date(now.getFullYear(), now.getMonth(), 1)),

            // Previous month
            formatMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1)),

            // 2 months back (optional)
            formatMonth(new Date(now.getFullYear(), now.getMonth() - 2, 1)),
        ];
    };



    const options = getDynamicOptions()

    const listing = [ 
        "All Listings",
        "Basic Listings",
        "Plain Listings",
        "Platinum Listings",
        "Premimum Listings",
        "Infinity Listings",
        "AI Listings",
        "Rental Experts"
    ]

    const sort = [
        "Latest First",
        "Oldest First",
        "Highest Socre First"
    ]

    const leadSource = [
        "All",
        ">=2",
        ">=3",
        ">=4"
    ]

    const leadresponse = [
        {
            name: "Tusar",
            phone: "+91-8510090048",
            projectname: 'Ace Responses',
            sector: 'Sector 150',
            city: 'Noida'
        },{
            name: "Tusar",
            phone: "+91-8510090048",
            projectname: 'Ace Responses',
            sector: 'Sector 150',
            city: 'Noida'
        },{
            name: "Tusar",
            phone: "+91-8510090048",
            projectname: 'Ace Responses',
            sector: 'Sector 150',
            city: 'Noida'
        },{
            name: "Tusar",
            phone: "+91-8510090048",
            projectname: 'Ace Responses',
            sector: 'Sector 150',
            city: 'Noida'
        },{
            name: "Tusar",
            phone: "+91-8510090048",
            projectname: 'Ace Responses',
            sector: 'Sector 150',
            city: 'Noida'
        },{
            name: "Tusar",
            phone: "+91-8510090048",
            projectname: 'Ace Responses',
            sector: 'Sector 150',
            city: 'Noida'
        },{
            name: "Tusar",
            phone: "+91-8510090048",
            projectname: 'Ace Responses',
            sector: 'Sector 150',
            city: 'Noida'
        },{
            name: "Tusar",
            phone: "+91-8510090048",
            projectname: 'Ace Responses',
            sector: 'Sector 150',
            city: 'Noida'
        },{
            name: "Tusar",
            phone: "+91-8510090048",
            projectname: 'Ace Responses',
            sector: 'Sector 150',
            city: 'Noida'
        },
    ]

    return (
        <div>
            <div className='border-b-2 border-gray-400'>
            <div className='flex ps-3 pb-5'>
                <div className='px-1 border-e border-gray-400'>
                    <label htmlFor="" className='text-xs font-normal'>DURATION</label><br />
                    <select
                        className="outline-none rounded px-1 py-1 cursor-pointer text-sm "
                        value={newest}
                        onChange={(e) => setNewest(e.target.value)}
                    >
                        {options.map((opt) => (
                            <option key={opt} className='cursor-pointer'>All{opt}</option>
                        ))}
                    </select>
                </div>

                {/* enter locality */}
                <div className='px-1 border-e border-gray-400'>
                <div className='flex mt-3'>
                    <CiSearch className='mt-3' />
                    <input type="text" className='text-gray-700 border-b mt-2 outline-none' placeholder='Enter Locality' />
                </div>
                </div>
                {/* enter search products */}
                <div className='px-1 border-e border-gray-400'>
                <div className='flex mt-3'>
                    <CiSearch className='mt-3' />
                    <input type="text" className='text-gray-700 border-b mt-2 outline-none' placeholder='Enter Locality' />
                </div>
                </div>

                {/* product */}
                  <div className='px-1 border-e border-gray-400'>
                    <label htmlFor="" className='text-xs font-normal'>PRODUCT</label><br />
                    <select
                        className="outline-none rounded px-1 py-1 cursor-pointer text-sm "
                        value={newest}
                        onChange={(e) => setNewest(e.target.value)}
                    >
                        {listing.map((opt) => (
                            <option key={opt} className='cursor-pointer'>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* sort */}
                <div className='px-1 border-e border-gray-400'>
                    <label htmlFor="" className='text-xs font-normal'>SORT</label><br />
                    <select
                        className="outline-none rounded px-1 py-1 cursor-pointer text-sm "
                        value={newest}
                        onChange={(e) => setNewest(e.target.value)}
                    >
                        {sort.map((opt) => (
                            <option key={opt} className='cursor-pointer'>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* lead score */}
                <div className='px-1 border-e border-gray-400'>
                    <label htmlFor="" className='text-xs font-normal'>LEAD SCORE</label><br />
                    <select
                        className="outline-none rounded px-1 py-1 cursor-pointer text-sm "
                        value={newest}
                        onChange={(e) => setNewest(e.target.value)}
                    >
                        {leadSource.map((opt) => (
                            <option key={opt} className='cursor-pointer'>{opt}</option>
                        ))}
                    </select>
                </div>
            </div>
            </div>

            {/* Response */}
            <div className='mt-5'>
                <div className='flex ps-4 justify-between'>
                    <div className='flex'>
                    <p className='px-2 border-e-2'><span className='text-sm font-medium'>All Responses({leadSource.length})</span></p>
                    <p className='px-2'><span className='text-sm font-medium'>All Responses({leadSource.length})</span></p>
                    </div>
                    <div>
                        <button className='bg-gray-500 text-xs text-white p-1 font-medium cursor-pointer'>Download Responses</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Allresponse

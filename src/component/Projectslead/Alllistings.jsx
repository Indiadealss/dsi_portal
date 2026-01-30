import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';

const Alllistings = () => {

    const options = [
        "Newest First",
        "Expiring Last",
        "Oldest First",
        "Expiring First"
    ];

    const categorys = [
        "PG",
        "RENT",
        "BUY",
        "LEASE"
    ]

    const [newest, setNewest] = useState('')
    const [category, setCategory] = useState('')
    const [filter,setFilter] = useState([])

    

    const numberofActiveProduct = 5
    return (
        <div>
            <div className='flex justify-between px-5 border-b-2 p-3 border-gray-300'>
                <div className='border-e border-gray-300'>
                    <span className='text-xs cursor-default'>ACTIVATION STATUS</span>
                    <div className='flex'>
                        <span className='text-xs px-3  border-e cursor-pointer text-gray-600'>ALL</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Active</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Reported</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Underscreening</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Expired</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Deleted</span>
                        <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>On Auto Extend</span>
                    </div>
                </div>

                <div className='border-e pe-2 border-gray-300'>
                    <div className='flex border-b border-gray-300'>
                        <CiSearch className='mt-6 font-bold text-lg' />
                        <input type="text" className='text-gray-700  mt-2 outline-none' placeholder='Enter Locality' />
                    </div>
                </div>
                <div className='border-e pe-2 border-gray-300'>
                    <span className='cursor-default text-xs text-right font-medium'>CATEGORY</span><br />
                    <select
                        className=" rounded px-1 py-1 cursor-pointer text-sm outline-none"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categorys.map((opt) => (
                            <option key={opt} className='cursor-pointer border-none outline-none'>{opt}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <span className='cursor-default text-xs text-right font-medium'>Sort</span><br />

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

            </div>

            {/* How many products */}

            <div className='shadow-md w-[96%] m-3 p-2 border border-gray-300 rounded'>

                {numberofActiveProduct < 1 ? (
                    <div>
                        <span className="font-medium text-sm">
                            {numberofActiveProduct} Active Products
                        </span>
                    </div>
                ) : (
                    <div className='flex'>
                        <span className="font-medium text-sm pe-5">
                            {numberofActiveProduct} Active Products
                        </span>

                        <div className='w-[50%] flex justify-around'>

                            <div className="flex items-center mb-4 border-e px-5">
                                <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft cursor-pointer"
                                />
                                <label
                                    htmlFor="default-checkbox"
                                    className="select-none ms-2 text-sm font-medium text-heading cursor-pointer"
                                >
                                    Select all
                                </label>
                            </div>

                            {/* Assign to sub user */}

                            <div className='border-e px-5 mb-4'>
                                <p><span className='text-xs font-medium cursor-pointer'>Assign to sub-user</span></p>
                            </div>

                            {/* Recall */}

                            <div className='border-e px-5 mb-4'>
                                <p><span className='text-xs font-medium cursor-pointer'>Recall</span></p>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* showing */}
                <div className='shadow-md w-[96%] m-3 p-2 border border-gray-300 rounded'>
                    <div className='flex'>
                    <p><span>Showing In:</span></p>
                    {}
                    <div className='flex'>
                        <button className='bg-gray-300 px-2 mx-5'><span className='text-xs text-blue-500'>Clear All Filters</span></button>
                    </div>
                    </div>
                </div>
        </div>
    )
}

export default Alllistings

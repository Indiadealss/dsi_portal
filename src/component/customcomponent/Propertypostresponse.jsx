import React, { useState } from 'react'
import Prbuderesponsis from './Prbuderesponsis';

const Propertypostresponse = ({ propertyIds, selectedId, onChange }) => {
    const property = [
        {
            _id: 'p101',
            property: 'Office',
            purpose: 'sale',
            status: 'Ready to move',
            location: 'G Block sector-63 Noida,Noida'
        }
    ]

    const [buyerRes, setBuyerRes] = useState(0);
    const [dealerRes, setDealerRes] = useState(0);
    return (
        <>
            <div className='flex flex-col lg:flex-row lg:justify-between px-5'>
                <div>
                    <h3>Your Property Postings</h3>
                    <p><span>Manage posting for</span>
                        <select
                            value={selectedId}
                            onChange={(e) => onChange(e.target.value)}
                            className="bg-transparent border-none cursor-pointer"
                        >
                            {propertyIds.map((id) => (
                                <option key={id} value={id}>
                                    {id}
                                </option>
                            ))}
                        </select>
                    </p>
                </div>
                <button type='button' className='hidden lg:block text-xl text-medium text-blue-500'>View all</button>

            </div>

            <div className='bg-orange-100 shadow-md rounded-lg p-[1px]'>
                <div className='bg-white w-full rounded-lg p-5'>
                    <div className='flex flex-col lg:flex-row lg:justify-between'>
                        <div className='flex'>
                            <img src='' alt='...' className='w-50 h-20' />
                            <div>
                                <p><span className="text-xs text-gray-500">Property ID- <span className="font-medium text-gray-700">{property[0]._id}</span></span></p>
                                <p><span className="font-medium text-xl">{property[0].status} {property[0].property} for {property[0].purpose}</span></p>
                                <p><span className="text-base text-gray-500">in {property[0].location}</span></p>
                            </div>
                        </div>
                        <button type='button' className='hidden lg:block p-0 m-0 h-10 border border-gray-300 p-2 rounded-full'>More</button>
                    </div>
                    <div></div>
                </div>
            </div>


            <div className='flex flex-col lg:flex-row lg:justify-between px-5'>
                <div>
                    <h3>0 Responses on this posting</h3>
                    <p><span>showing for</span>
                        <select
                            value={selectedId}
                            onChange={(e) => onChange(e.target.value)}
                            className="bg-transparent border-none cursor-pointer"
                        >
                            {propertyIds.map((id) => (
                                <option key={id} value={id}>
                                    {id}
                                </option>
                            ))}
                        </select>
                    </p>
                </div>
                <button type='button' className='text-xl hidden lg:block text-medium text-blue-500'>View all Responses</button>

            </div>

            <div className="flex flex-col lg:flex-row justify-around">
                <Prbuderesponsis responses={buyerRes} resposerName='Buyer Responses' />
                <Prbuderesponsis responses={dealerRes} resposerName='Dealer Responses' />
            </div>
        </>
    )
}

export default Propertypostresponse
import React from 'react'
import img1 from '../Images/noImageBg.svg';
import { IoIosAdd } from 'react-icons/io';
import { MdCurrencyRupee } from "react-icons/md";
import Ownerdetails from './Ownerdetails';
export const PropertiesData = () => {

    let timeStamp = Date.now();

    console.log(timeStamp);


    const propertyData = [
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43 ', time: '08/08/2025', owner: 'Rohit' }
    ]
    return (
        <div className=''>
            {propertyData.map((item, index) => {
                return (
                    <div key={index} className="flex w-full flex-col lg:flex-row  bg-white border border-gray-200 rounded-lg shadow-sm sm:p-2 dark:bg-gray-800 dark:border-gray-700 mt-5">
                        <div className=''>
                            {item.images.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <img className='webkitFillAvailable lg:w-[36vw]  h-auto lg:h-[21vw]' src={item.src} alt='' />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='md:webkitFillAvailable lg:w-[36vw] '>
                            <div className="px-6">
                                <h5 className='text-base font-bold' >{item.title}</h5>
                                <h6 className='text-base font-samibold'>{item.bedroom} Flat for rent {item.location}</h6>
                            </div>
                            <div className='flex m-2 py-2'>

                                <div className='px-2 border-e border-gray-300'>
                                    <div className='flex '>
                                        <span className='text-sm'><MdCurrencyRupee className="mt-1 text-lg" /></span>
                                        <p className='text-sm'>{item.price}/month</p>
                                    </div>
                                    <div className='flex'>
                                        <span className='text-sm'><IoIosAdd className="mt-1  text-lg" /></span>
                                        <p className='text-sm'>Deposit</p>
                                        <span className='text-base'><MdCurrencyRupee className='mt-1 text-lg' /></span>
                                        <p>{item.deposit}</p>
                                    </div>
                                </div>

                                <div className='px-5 border-e border-gray-300'>
                                    <div className='flex'>
                                        <p className='text-sm'>{Math.round(item.size * 10.76391041671)} Sqft ({item.size}sqm)</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm'>{item.area} Area</p>
                                    </div>

                                </div>
                                <div className='px-5'>
                                    <div className='flex'>
                                        <p className='text-sm'>{item.bedroom}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm'>{item.bathroom}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="flex py-2 relative group cursor-pointer">
                                <div>
                                    <p className="text-sm font-bold ps-5">Highlights:</p>
                                </div>

                                {item.heilights.slice(0, 2).map((item, index) => (
                                    <div key={index}>
                                        <p className="text-gray-500 text-sm mx-1 px-2 py-0.5 bg-gray-100 rounded-full">
                                            {item.helight}
                                        </p>
                                    </div>
                                ))}

                                {item.heilights.length >= 3 && (
                                    <p className="text-gray-500 text-sm mx-1 px-2 py-0.5 bg-gray-100 rounded-full">
                                        +{item.heilights.length - 2}
                                    </p>
                                )}

                                {/* Hover card showing all highlights */}
                                <div className="absolute  left-0  bg-white shadow-md border rounded-md p-3 hidden group-hover:block z-10">
                                    <div className="flex flex-wrap gap-1">
                                        <div>
                                            <p className="font-bold text-sm mb-1">Highlights:</p>
                                        </div>
                                        {item.heilights.map((item, index) => (
                                            <span key={index} className="text-gray-700 text-sm px-2 py-1 bg-gray-100 rounded-full">
                                                {item.helight}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>



                            <div className="flex flex-wrap w-[32vw] px-5 py-3  group cursor-pointer">
                                <p className='text-sm wrap-normal md:wrap-break-word truncate '>{item.description}</p>

                                {/* Hover card showing all highlights */}
                                <div className="absolute    bg-white shadow-md border rounded-md p-3 hidden group-hover:block z-10">
                                    <div className="flex flex-wrap gap-1">
                                        <div>
                                            {/* <p className="font-bold text-sm mb-1">Desct:</p> */}
                                        </div>
                                        
                                            <span key={index} className="text-gray-700 text-sm px-2 py-1 ">
                                                {item.description}
                                            </span>
                                            <span>View Details</span>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className='flex ps-2 pt-2 justify-between'>
                                <div>
                                    <p className='text-base text-gray-500'>Dealer . 1w ago</p>
                                    <p className='text-sm font-bold text-gray-500'>{item.owner}</p>
                                </div>
                                <div className='flex'>
                                    <Ownerdetails />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

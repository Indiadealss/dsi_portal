import React from 'react';
import { FaRupeeSign } from "react-icons/fa";
import user from '../../Images/fd-default.webp';
import homeLogo from '../../Images/homelogo.png'
import Antcustom from '../customantdesign/Antcustom';

const Propertydetailsstickcard = () => {
    const propertyDetails = {
        price:"7 Cr",
        size:"2,33,333 per sq.m",
        bedrooms:"8",
        bathrooms:"8",
        propertyType:"Independent House/Villa for Sale",
        location:"Sector 33,Noida",
       }

       const buttonNames = [
        {
            title:'Overview',
            to:''
        },
        {
            title:'Dealer Details',
            to:''
        },
        {
            title:'Registry Record',
            to:''
        },
        {
            title:'Explore Locality',
            to:''
        },
        {
            title:'Recommendations',
            to:''
        },
        {
            title:'Articles',
            to:''
        }
       ]

    
  return (
    <div className='mb-5'>
    <div className='border-b border-gray-300'>
        <div className='mx-10'>
            <button className='text-white text-[10px] font-bold px-1 bg-[#814883fc]'>Featured</button>
        <div className='flex'>
            <div className='flex pe-[20px]'>
            <FaRupeeSign className='mt-3 text-xl' />
            <h1>{propertyDetails.price}<span className='text-lg font-normal text-gray-400'>@ {propertyDetails.size}</span></h1>
            </div>
            <div className='ps-[20px] border-s border-gray-300'>
                <h2><span className='font-light text-gray-400'>{propertyDetails.bedrooms}Bedrooms {propertyDetails.bathrooms}Baths</span></h2>
                <p><span  className='font-normal text-gray-400 text-base'>{propertyDetails.propertyType}</span></p>
                <p className='font-normal text-gray-400'>in {propertyDetails.location}</p>
            </div>

            {/* details */}
            <div className='bg-white shadow-md max-w-sm absolute right-5 rounded-lg border border-gray-300'>
                <div className='flex  px-3 pt-3'>
                    <img src={user} alt='...' className='w-15 h-15 me-2 rounded-full' />
                    <div>
                        <p ><span className="text-[10px] font-bold text-gray-500">BEST PROPERTIES NOIDA</span></p>
                        <p ><span className='text-lg font-semibold'>Sales team</span></p>
                        <div className='flex '>
                        <button className='px-2 bg-blue-300 me-2 text-xs '>FEATURED DEALER</button>
                        <p ><span className='border-s ps-2 text-gray-400'>Member Since Dec,2022</span></p>
                        </div>
                    </div>
                </div>
                <button className='px-5 bg-blue-500 ms-4 my-2 text-white' >Contact Dealer<sup> Free</sup></button>
                <div className='flex w-full bg-blue-100 py-2 rounded'>
                    <img src={homeLogo} alt="homeLogo" className='p-2 rounded-full bg-white ms-2'/>
                    <p><span className='px-2 font-medium text-gray-500'>Ready to move Property</span></p>
                    <p><span className='px-2 border-s font-medium text-gray-500'>Posted on july 25,2025</span></p>
                </div>
            </div>

            
        </div>

        <div className='mt-10'>
                <p><span className='px-2 text-white bg-green-900'>RERA STATUS</span><span className='text-green-500 px-2 bg-gray-300 font-medium'>NOT AVAILABLE <span className='px-2 text-gray-700'>Website:http://up-rera.in/projects</span></span></p>
            </div>

            <div className='mt-10 max-w-2xl'>
                <Antcustom articles={buttonNames} />
            </div>
        </div>
    </div>
    </div>
  )
}

export default Propertydetailsstickcard;
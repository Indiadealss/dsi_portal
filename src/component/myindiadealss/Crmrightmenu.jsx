import React from 'react'
import { useSelector } from 'react-redux';
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Admindropdown from '../customantdesign/Admindropdown';

const Crmrightmenu = () => {

    const user = useSelector((state) => state.user);

    const Listings = [
            {name:'All Listings', link:'/myindiadealss/all_listings'},
            {name:'Plan Listings',link:'/myindiadealss/LP-f'},
            {name:'Basic Listings',link:'/myindiadealss/LP-B'},
            {name:'Platinum Listings',link:'/myindiadealss/LP-P'},
            {name:'Premimum Listings',link:'/myindiadealss/LP-R'},
            {name:'Infinity Listings',link:'/myindiadealss/LP-I'},
            {name:'AI Listings',link:'/myindiadealss/LP-T'},
        ]
    
        const Projects = [
            {name: 'All Products',link:'/myindiadealss/all_listings/ALL'},
            {name:'Super Campaign',link:'/myindiadealss/all_listings/CMT'},
            {name:'BBC',link:'/myindiadealss/all_listings/BBC'},
            {name:'SAB',link:'/myindiadealss/all_listings/SAB'},
            {name:'NP/FP/PG/AP/AS',link:'/myindiadealss/all_listings/ALLNP'},
            {name:'E-Mailers',link:'/myindiadealss/all_listings/MM'},
            {name:'Omni Ads',link:'/myindiadealss/all_listings/OA'},
        ]
  return (
    <div className='w-[15%] '>
                    <div className='w-[100%] bg-[#00255d] pt-5 overflow-y-auto'>
                        <div className='w-20 h-20  rounded-full mx-auto'>
                            {user.img ? (
                                <img src='' alt='...' className='w-10 h-10 bg-gray-300 rounded-full' />
                            ) : (
                                <FaRegUser className='w-20 h-20 bg-gray-300 rounded-full' />
                            )}
                        </div>
                        <div className='mx-3'>
                            <h4><span className='text-white'>{user.name}</span></h4>
                            <p><span className='text-white text-sm'>Manage User</span></p>

                        </div>
                        <div className='px-2 bg-[#f0f8ff57] rounded-xl ms-auto w-[min-content]'>
                            <p><span className='text-sm text-white'>Modify</span></p>
                        </div>
                    </div>
                    <div className='w-[100%] bg-black py-5  left-0 h-screen overflow-y-auto'>
                        <div className='mx-3'>
                            <Link to={`/`}><span className='text-xs text-gray-500 font-medium'>My DOOR</span></Link>
                        </div>
                        <div className='bg-white/20 ms-5 mt-5 px-5'>
                            <span className='text-xs text-center font-medium text-gray-500'>MANAGE PRODUCTS</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>All Product</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Admindropdown name={'Listings'} Listings={Listings} />
                        </div>
                        <div className='mx-3 mt-4'>
                            <Admindropdown name={'Projects'} Listings={Projects} />
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Banners</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>FSL Booking</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Manage BOSS</span></Link>
                        </div>
                        <div className='bg-white/20 ms-5 mt-5  px-5'>
                            <span className='text-xs text-center font-medium text-gray-500'>MANAGE Responses</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>All Responses</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Admindropdown name={'Listings'} Listings={Listings} />
                        </div>
                        <div className='mx-3 mt-4'>
                            <Admindropdown name={'Projects'} Listings={Projects} />
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>All Leads</span></Link>
                        </div>
                        <div className='bg-white/20 ms-5 mt-5'>
                            <span className='text-xs text-center mx-5 font-medium text-gray-500'>UPLOAD MEDIA</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>All Listings</span></Link>
                        </div>
                        <div className='bg-white/20 ms-5 mt-5 px-5'>
                            <span className='text-xs text-center  font-medium text-gray-500'>MANAGE SUBSCRIPTIONS</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Subscription Status</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Credit Usage History</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Upgrade History</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Manage Sub users 0</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Omni Ads Performance</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Get Leads</span></Link>
                        </div>
                        <div className='bg-white/20 ms-5 mt-5'>
                            <span className='text-xs text-center mx-5 font-medium text-gray-500'>MY PROFILE</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Shortlist</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Change Password</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Opt out Dealer Response</span></Link>
                        </div>
                    </div>
                </div>
  )
}

export default Crmrightmenu

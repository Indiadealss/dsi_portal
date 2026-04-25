import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUser } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';
import Admindropdown from '../customantdesign/Admindropdown';
import Allprojects from '../Projectslead/Allprojects';
import Crmrightmenu from './Crmrightmenu';
import { Modal } from 'antd';
import Changepasswordmodal from '../customantdesign/Changepasswordmodal';

const Mybrandsdoor = () => {

    const user = useSelector((state) => state.user);

    const [open, setOpen] = useState(false);
    const [currentbtn, setCurrentBtn] = useState();

    const [openSidebar, setOpenSidebar] = useState(false);

    const changeMyprofile = (buttonName) => {
        setOpen(true);
        setCurrentBtn(buttonName);
    }

    const getInitials = (name) => {
        if (!name) return "";
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0][0].toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = "auto";
    }, [])

    const Listings = [
        { name: 'All Listings', link: 'all_listings/LP' },
        { name: 'Plan Listings', link: 'all_listings/LP-f' },
        { name: 'Platinum Listings', link: 'all_listings/LP-P' },
        { name: 'Premimum Listings', link: 'all_listings/LP-R' },
        { name: 'Infinity Listings', link: 'all_listings/LP-I' },
    ]

    const Projects = [
        { name: 'All Products', link: 'all_listings/ALL' },
        { name: 'Super Campaign', link: '/mybrandsdoor/all_listings/CMT' },
    ]

    return (
        <div className='bg-gray-100 mt-0 lg:mt-20'>

            {/* MOBILE HEADER */}
            <div className='lg:hidden flex justify-between items-center px-4 py-3 bg-[#00255d] text-white'>
                <span>Dashboard</span>
                <button onClick={() => setOpenSidebar(true)}>☰</button>
            </div>

            <div className='flex flex-col lg:flex-row w-full lg:w-[90%] mx-auto'>

                {/* SIDEBAR DESKTOP */}
                <div className='hidden lg:block w-[20%]'>

                    {/* SAME YOUR SIDEBAR */}
                    <div className='w-[100%] bg-[#00255d] pt-5 overflow-y-auto'>
                        <div className="w-20 h-20 rounded-full mx-auto overflow-hidden bg-gray-300 flex items-center justify-center">

                            {user.loggedIn ? (
                                user.profile_photo ? (
                                    <img src={user.profile_photo} className="w-full h-full object-cover rounded-full" />
                                ) : user.name ? (
                                    <span>{getInitials(user.name)}</span>
                                ) : <FaRegUser />
                            ) : <FaRegUser />}

                        </div>

                        <div className='mx-3'>
                            <h4><span  className='text-white text-xl'>{user.name}</span></h4>
                            <p className='text-white text-sm'>Manage User</p>
                        </div>

                        <div className='px-2 bg-[#f0f8ff57] rounded-xl w-fit float-right'>
                            <Link to={`editProfile`}><span className='text-sm text-white'>Modify</span></Link>
                        </div>
                    </div>

                    <div className='bg-black pt-5 pb-10 h-[calc(100vh-250px)] overflow-y-auto'>
                        <div className='mx-3'>
                            <Link to={`Homepage`}><span className='text-xs text-gray-500 font-medium'>My DOOR</span></Link>
                        </div>
                        <div className='bg-white/20 ms-5 mt-5 px-5'>
                            <span className='text-xs text-center font-medium text-gray-500'>MANAGE PRODUCTS</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`all_listings`} ><span className='text-sm text-gray-500 font-medium'>All Product</span></Link>
                        </div>
                         <div className='mx-3 mt-4'>
                            <Link to={`Edit_Profile/LP`} ><span className='text-sm text-gray-500 font-medium'>Edit Profile</span></Link>
                        </div>
                        
                        <div className='mx-3 mt-4'>
                            <Admindropdown name={'Listings'} Listings={Listings} />
                        </div>
                        <div className='mx-3 mt-4'>
                            <Admindropdown name={'Projects'} Listings={Projects} />
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`all_listings/BANNER`} ><span className='text-sm text-gray-500 font-medium'>Banners</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`fslMyINDIADEALSS`} ><span className='text-sm text-gray-500 font-medium'>FSL Booking</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`manageBoss`} ><span className='text-sm text-gray-500 font-medium'>Manage BOSS</span></Link>
                        </div>
                        <div className='bg-white/20 ms-5 mt-5  px-5'>
                            <span className='text-xs text-center font-medium text-gray-500'>MANAGE Responses</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`all_responses/ALL`} ><span className='text-sm text-gray-500 font-medium'>All Responses</span></Link>
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
                        {/* <div className='bg-white/20 ms-5 mt-5'>
                                            <span className='text-xs text-center mx-5 font-medium text-gray-500'>UPLOAD MEDIA</span>
                                        </div>
                                        <div className='mx-3 mt-4'>
                                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>All Listings</span></Link>
                                        </div> */}
                        <div className='bg-white/20 ms-5 mt-5 px-5'>
                            <span className='text-xs text-center  font-medium text-gray-500'>MANAGE SUBSCRIPTIONS</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Manage Payments</span></Link>
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
                        {/* <div className='mx-3 mt-4'>
                                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Omni Ads Performance</span></Link>
                                        </div> */}
                        {/* <div className='mx-3 mt-4'>
                                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Get Leads</span></Link>
                                        </div> */}
                        <div className='bg-white/20 ms-5 mt-5'>
                            <span className='text-xs text-center mx-5 font-medium text-gray-500'>MY PROFILE</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/recent-activity?type=shortlist`} ><span className='text-sm text-gray-500 font-medium cursor-pointer'>Shortlist</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <span className='text-sm text-gray-500 font-medium cursor-pointer' onClick={() => changeMyprofile('settingMyLead')}>My Lead</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <span className='text-sm text-gray-500 font-medium cursor-pointer' onClick={() => changeMyprofile('changePassword')}>Change Password</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <span className='text-sm text-gray-500 font-medium cursor-pointer' onClick={() => changeMyprofile('opt')}>Opt out Dealer Response</span>
                        </div>
                        <div className={user.id === '693924cf24fec280265bbdc2' ? '' : 'hidden'}>
                            <div className='bg-white/20 ms-5 mt-5'>
                                <span className='text-xs text-center mx-5 font-medium text-gray-500'>Admin</span>
                            </div>
                            <div className='mx-3 mt-4'>
                                <Link to={`edit-title-discription`}><span className='text-sm text-gray-500 font-medium cursor-pointer'>Edit Project Details</span></Link>
                            </div>
                            <div className='mx-3 mt-4'>
                                <Link to={`/`} ><span className='text-sm text-gray-500 font-medium cursor-pointer'></span></Link>
                            </div>
                            <div className='mx-3 mt-4'>
                                <Link to={`/`} ><span className='text-sm text-gray-500 font-medium cursor-pointer'>Shortlist</span></Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE CONTENT */}
                <div className='w-full lg:w-[80%] h-screen overflow-hidden flex flex-col'>

                    {/* TOP BAR */}
                    <div className='ps-5 flex flex-col md:flex-row pt-2 pb-3'>
                        <div className='md:w-[30%]'>
                            <span className='text-xs text-gray-500'>Last Visited: time | date</span>
                        </div>

                        <div className='hidden flex flex-wrap gap-3 text-xs justify-center w-full'>
                            <span>|</span>
                            <Link to='/do/buyservie'>BUY OUR SERVICES</Link>
                            <span>|</span>
                            <Link to='/do/buyservie'>POST A PROPERTY</Link>
                            <span>|</span>
                            <Link to='/do/buyservie'>COSTUMER SERVICE</Link>
                        </div>
                    </div>

                    {/* MAIN SCROLL AREA */}
                    <div className='flex-1 overflow-y-auto px-2 md:px-5 pb-10 mb-[7vw]'>
                        <Outlet />
                    </div>

                    <Changepasswordmodal open={open} setOpen={setOpen} setCurrentBtn={setCurrentBtn} currentbtn={currentbtn} />
                </div>
            </div>

            {/* MOBILE SIDEBAR MODAL */}
            <div className={`fixed inset-0 z-50 lg:hidden ${openSidebar ? 'block' : 'hidden'}`}>

                <div className="absolute inset-0 bg-white top-100" onClick={() => setOpenSidebar(false)}></div>

                <div className={`absolute bottom-0 left-0 w-full h-[90%] bg-black transition-transform duration-300 overflow-y-auto
                ${openSidebar ? 'translate-y-0' : 'translate-y-full'}`}>
                        <div className="flex justify-end p-3 sticky top-0 bg-black z-50">
            <button 
                onClick={() => setOpenSidebar(false)} 
                className='bg-white text-black px-3 py-1 rounded'
            >
                Close
            </button>
        </div>
                    <div className='w-full bg-black pt-5 pb-10 h-full lg:h-[400px] 2xl:h-[440px] overflow-y-auto overflow-x-hidden relative'>
                        <div className='mx-3'>
                            <Link to={`Homepage`}><span className='text-xs text-gray-500 font-medium'>My DOOR</span></Link>
                        </div>
                        <div className='bg-white/20 ms-5 mt-5 px-5'>
                            <span className='text-xs text-center font-medium text-gray-500'>MANAGE PRODUCTS</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`all_listings`} ><span className='text-sm text-gray-500 font-medium'>All Product</span></Link>
                        </div>
                         <div className='mx-3 mt-4'>
                            <Link to={`Edit_Profile/LP`} ><span className='text-sm text-gray-500 font-medium'>Edit Profile</span></Link>
                        </div>
                        
                        <div className='mx-3 mt-4'>
                            <Admindropdown name={'Listings'} Listings={Listings} />
                        </div>
                        <div className='mx-3 mt-4'>
                            <Admindropdown name={'Projects'} Listings={Projects} />
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`all_listings/BANNER`} ><span className='text-sm text-gray-500 font-medium'>Banners</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`fslMyINDIADEALSS`} ><span className='text-sm text-gray-500 font-medium'>FSL Booking</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`manageBoss`} ><span className='text-sm text-gray-500 font-medium'>Manage BOSS</span></Link>
                        </div>
                        <div className='bg-white/20 ms-5 mt-5  px-5'>
                            <span className='text-xs text-center font-medium text-gray-500'>MANAGE Responses</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`all_responses/ALL`} ><span className='text-sm text-gray-500 font-medium'>All Responses</span></Link>
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
                        {/* <div className='bg-white/20 ms-5 mt-5'>
                                            <span className='text-xs text-center mx-5 font-medium text-gray-500'>UPLOAD MEDIA</span>
                                        </div>
                                        <div className='mx-3 mt-4'>
                                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>All Listings</span></Link>
                                        </div> */}
                        <div className='bg-white/20 ms-5 mt-5 px-5'>
                            <span className='text-xs text-center  font-medium text-gray-500'>MANAGE SUBSCRIPTIONS</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Manage Payments</span></Link>
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
                        {/* <div className='mx-3 mt-4'>
                                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Omni Ads Performance</span></Link>
                                        </div> */}
                        {/* <div className='mx-3 mt-4'>
                                            <Link to={`/`} ><span className='text-sm text-gray-500 font-medium'>Get Leads</span></Link>
                                        </div> */}
                        <div className='bg-white/20 ms-5 mt-5'>
                            <span className='text-xs text-center mx-5 font-medium text-gray-500'>MY PROFILE</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <Link to={`/recent-activity?type=shortlist`} ><span className='text-sm text-gray-500 font-medium cursor-pointer'>Shortlist</span></Link>
                        </div>
                        <div className='mx-3 mt-4'>
                            <span className='text-sm text-gray-500 font-medium cursor-pointer' onClick={() => changeMyprofile('settingMyLead')}>My Lead</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <span className='text-sm text-gray-500 font-medium cursor-pointer' onClick={() => changeMyprofile('changePassword')}>Change Password</span>
                        </div>
                        <div className='mx-3 mt-4'>
                            <span className='text-sm text-gray-500 font-medium cursor-pointer' onClick={() => changeMyprofile('opt')}>Opt out Dealer Response</span>
                        </div>
                        <div className={user.id === '693924cf24fec280265bbdc2' ? '' : 'hidden'}>
                            <div className='bg-white/20 ms-5 mt-5'>
                                <span className='text-xs text-center mx-5 font-medium text-gray-500'>Admin</span>
                            </div>
                            <div className='mx-3 mt-4'>
                                <Link to={`edit-title-discription`}><span className='text-sm text-gray-500 font-medium cursor-pointer'>Edit Project Details</span></Link>
                            </div>
                            <div className='mx-3 mt-4'>
                                <Link to={`/`} ><span className='text-sm text-gray-500 font-medium cursor-pointer'></span></Link>
                            </div>
                            <div className='mx-3 mt-4'>
                                <Link to={`/`} ><span className='text-sm text-gray-500 font-medium cursor-pointer'>Shortlist</span></Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Mybrandsdoor
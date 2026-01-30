import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { updateUser } from '../../api/api';
import { faL } from '@fortawesome/free-solid-svg-icons';

const Modify = () => {

    const user = useSelector((state) => state.user);

    console.log(user, '8 user');

    const [you_are, setYou_are] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [companyname, setCompanyname] = useState('');
    const [phone, setPhone] = useState('');
    const [alternative, setAlternative] = useState('');
    const [altternative, setAltternative] = useState('');
    const [companyurl, setCompanyurl] = useState('');
    const [companyprofile, setCompanyprofile] = useState('');
    const [address, setAddress] = useState('');
    const [landline, setLandline] = useState('');
    const [message,setMessage] = useState('');

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.mobile);
    },[])


    const savebtn = async () => {
        if(!you_are || you_are <=3){
            setMessage('Enter the valid you are (Dealer,Buyer,Owner)')
            return false;
        }

        if(!name || name <= 3){
            setMessage('Enter the Valid Name')
            return false;
        }

         if(!email.length || !isValid){
                setMessage('Enter the Valid ')
                return false;
            }

        if(!phone || phone <= 9){
            setMessage('Enter the Valid Phone Number')
            return false;
        }

        if(!companyprofile || companyprofile <= 4){
            setMessage('Enter the Valid profile')
            return false;
        }


    }
    


    return (
        <div className='mx-5 pb-20'>
            <div className='bg-gray-300 shadow-md border border-gray-200 w-[100%] px-4'>
                <span className='text-xs font-light'>Your Content Details</span><br />
                <span>(This is where people interested in your property will contact you)</span>
            </div>
            <div className='border border-gray-300 rounded-xl py-2  mt-10'>
                <div className='px-20'>
                    <div className='text-center'>
                        <span className='text-sm text-red-500 mx-auto'>{message}</span>
                        <div className='flex justify-around my-5'>
                            <p><span>You are<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Name<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Email ID<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Company Name<sup className='text-red-500'>*</sup></span></p>
                            <div className='ms-8'>
                                <input type="text" value={companyname} onChange={(e) => setCompanyname(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                                <span className='text-blue-500 font-light text-[10px] ,s-2'>Change</span>
                            </div>
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Phone Number<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Phone Number<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={alternative} onChange={(e) => setAlternative(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Phone Number<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={altternative} onChange={(e) => set(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Company URL<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={companyurl} onChange={(e) => setCompanyurl(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Company Profile<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={companyprofile} onChange={(e) => setCompanyprofile(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Address<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Landline No<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={landline} onChange={(e) => setLandline(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Upload image<sup className='text-red-500'>*</sup></span></p>
                            {/* Upload the profile photo*/}
                            <div className='shadow bg-white p-3  rounded-xl'>
                                <div className='flex'>
                                    <div className='bg-gray-300 border border-gray-300  rounded-xl mx-5'>
                                        <div className='p-4 cursor-pointer'>
                                            <FaRegUserCircle className='text-blue-500 text-center mx-auto text-2xl' />
                                            <p><span className='text-sm text-blue-500'>Upload Profile Photo</span></p>
                                        </div>
                                    </div>

                                    {/* upload the company logo */}
                                    <div className='bg-gray-300 border border-gray-300 rounded-xl mx-5'>
                                        <div className='p-4 cursor-pointer'>
                                            <FaRegUserCircle className='text-blue-500 text-center mx-auto text-2xl' />
                                            <p><span className='text-sm text-blue-500'>Upload Company Logo</span></p>
                                        </div>
                                    </div><br />
                                </div>
                                <p><span className='text-gray-400 font-medium text-sm text-center py-auto'>Images should .jpg,.jpeg format & less than 10 mb</span></p>
                            </div>
                        </div>

                        {/* add the Current State */}

                        <div className='border-y py-5 border-gray-300'>
                            <div className='flex justify-around'>
                                <div>
                                    <p><span className='font-light text-gray-700'>Current State: <span className='font-medium'>UP</span></span></p>
                                </div>
                                <div>
                                    <p><span className='font-light text-gray-700'>Current City: <span className='font-medium'>Grater Noida</span></span></p>
                                </div>
                            </div>
                            <div className='flex justify-around'>
                                <div>
                                    <p><span>Current Address: <span>Grater Noida West, UP</span></span></p>
                                </div>
                                <div>
                                    <p><span>GISTIN Number: <span>jdj28dsfj28</span></span></p>
                                </div>
                            </div>

                            {/* Note */}

                            <div className='mt-4'>
                                <p><span>Note:</span> <span className='text-xs'>These details will be used to compute GST when you make a purchase. To edit GST related details contact gst.customer@infoedge.in.</span></p>
                            </div>
                        </div>



                    </div>
                </div>
                                    {/* aggreement */}

                    <div className='shadow-sm bg-white mt-3 mx-5 px-2'>
                        <p><span>Subscribe For Updates From BRANDSDOOR</span></p>
                        <div class="flex items-center mb-4 mt-2 py-3">
                            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                            <label for="default-checkbox" class="select-none ms-2 text-xs font-medium text-heading">I agree to be contacted by BRANDSDOOR for similar properties or related services via What's app, phone(overring NDNC registration), SMS,e-mail etc.</label>
                        </div>
                    </div>

                    {/* clicking bleow you agree to Terms and Conditions */}

                    <div className='mx-4 text-xs'>
                    <p><span>By clicking below you agree to </span><span className='text-blue-500'>Terms and Conditions</span></p>
                    </div>

                    {/* save button */}

                    <div className='mx-[50%] w-[100%]'>
                        <button type='button' onClick={savebtn} className='text-white bg-blue-500 rounded text-lg font-medium px-5 mx-auto'>Save</button>
                    </div>
            </div>

        </div>
    )
}

export default Modify

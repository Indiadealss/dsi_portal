import React, { useEffect, useRef, useState } from 'react'
import Propertydetailscarddata from './Propertydetailscarddata'
import user from '../../Images/fd-default.webp';
import Phoneinput from '../Phoneinput';
import { useSelector } from 'react-redux';

const Propertydelardetail = ({onDealerPosition }) => {

    const [intrested, setIntrested] = useState(400);
    const property = useSelector((state) => state.propertyid.data);

    const dealerRef = useRef(null);

    useEffect(() => {
        // wait for layout to stabilize before measuring

        const timer = setTimeout(() => {
            if(dealerRef.current) {
                const rect = dealerRef.current.getBoundingClientRect();;
                const scrollY = window.scrollY + rect.top;
                console.log('Dealer Details:',scrollY);
                onDealerPosition?.(scrollY);
            }
        },100);

        return () => clearTimeout(timer);
    },[]);

     if (!property || !property.owner) {
        return (
            <div className='mb-5'>
                Loding...
            </div>
        )
    }


    return (
        <div ref={dealerRef}>
            <p><span className=''>Dealer Details</span></p>
            <div className='flex flex-col lg:flex-row lg:justify-around mt-3'>
                <div>

                    <div className='bg-white shadow-md   border-x border-t border-gray-300'>
                        <div className='flex  px-3 pt-3'>
                            <img src={user} alt='...' className='w-15 h-15 me-2 rounded-full' />
                            <div>
                                <p ><span className="text-[10px] font-bold text-gray-500">BEST PROPERTIES NOIDA</span></p>
                                <p ><span className='text-lg font-semibold'>{property.owner.name}</span></p>
                                <div className='flex '>
                                    <button className='px-2 bg-blue-300 me-2 text-xs '>FEATURED DEALER</button>
                                    <p ><span className='border-s ps-2 text-gray-400'>Member Since {new Date(property.owner.updatedAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            year: "numeric",
                                        })}</span></p>
                                </div>
                            </div>
                        </div>
                        <button className='px-5 bg-blue-500 ms-4 my-2 text-white' >Contact Dealer<sup> Free</sup></button>
                    </div>
                    <div className='bg-white shadow-md   border border-gray-300'>
                        <div className='flex  px-3 pt-3'>
                            <div>
                                <p><span className="text-[10px] font-bold text-gray-500">Additional Details</span></p>
                                <p><span className=' font-medium'>About:</span></p>
                                <p><span className='font-medium'>Address:</span></p>
                                <p><span className='font-medium'>Website:</span></p>
                            </div>
                        </div>
                        <button className='px-5 bg-blue-500 ms-4 my-2 text-white' >Contact Dealer<sup> Free</sup></button>
                    </div>
                </div>
                <div className='ms-4'>
                    <p><span className='font-medium text-xl text-gray-500'>Send enquiry to Dealer</span></p>
                    <div className='mt-5'>
                        <div className='flex'>
                            <p className='font-medium text-gray-500 p-2'>You are</p>
                            <div className="flex items-center">
                                <input id="default-radio-1" type="radio" value="Individual" name="default-radio" className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 " />
                                <label for="default-radio-1" className="m-2 text-sm  text-gray-500 ">Individual </label>
                            </div>
                            <div className="flex items-center" >
                                <input id="default-radio-2" type="radio" value="Dealer" name="default-radio" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer' />
                                <label for="default-radio-2" className="m-2 text-sm  text-gray-500 ">Dealer</label>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex '>
                            <p className='font-medium text-gray-500 p-2'>You are reason to buy is</p>
                            <div className="flex items-center">
                                <input id="default-radio-1" type="radio" value="Investment" name="default-radio" className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 " />
                                <label for="default-radio-1" className="m-2 text-sm  text-gray-500 ">Investment </label>
                            </div>
                            <div className="flex items-center" >
                                <input id="default-radio-2" type="radio" value="Selfuse" name="default-radio" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer' />
                                <label for="default-radio-2" className="m-2 text-sm  text-gray-500 ">Self use</label>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row'>
                        <div>
                            <div className='my-1'>
                                <input type="text" id="first_name" class='w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    ' placeholder="Enter City" required />
                            </div>
                            <div className='my-1'>
                                <Phoneinput />
                            </div>
                        </div>
                        <div>
                            <textarea id="message" rows="4" class="block m-0 lg:mx-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:ring-blue-500 focus:border-blue-500    " placeholder="I am interested in this Property." maxLength={400} minLength={5} onInput={(e) => setIntrested(e.target.value.length)}></textarea>
                            <p className='text-right'><span>{intrested}</span></p>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center">
                            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                            <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">I agree to the Trems & Conditions and Privacy Policy</label>
                        </div>

                        <button type='button' className='bg-blue-500 p-2 my-3'>Send Email & SMS</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Propertydelardetail;
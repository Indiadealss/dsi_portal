import React, { useState } from 'react'
import { LuIndianRupee } from "react-icons/lu";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { WiDirectionRight } from "react-icons/wi";
import { Drawer } from 'antd';
import { Modal } from "antd";
import { IoMdInformationCircle } from "react-icons/io";
const Buyservice = () => {
    const numberOfListingPack = 25;
    const price = 11238;
    const GST = price * 0.18;
    const priceIncGST = price + GST;

    const [open,setOpen] = useState(false);
    const [isModelOpen,setIsModelOpen] = useState(false)


    const showModel = () => {
  setIsModelOpen(true);
};
    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }
    
    const features = [
        {
            icon:FaCircleCheck,
            label:'Upto 5x increase in buyer responses',
            informationicon:IoIosInformationCircleOutline,
            information:'Compared to free listings you get 5X more responses.'
        },
        {
            icon:FaCircleCheck,
            label:'Free verification',
            informationicon:IoIosInformationCircleOutline,
            information:'Verifications and good photos improve responses by 3X'
        },
        {
            icon:FaCircleCheck,
            label:'Post any property(resale/rent/commerical)',
            informationicon:IoIosInformationCircleOutline,
            information:''
        },
        {
            icon:FaCircleCheck,
            label:'Application PAN India',
            informationicon:IoIosInformationCircleOutline,
            information:''
        },
        {
            icon:FaCircleCheck,
            label:'Listing Duration:2 months',
            informationicon:IoIosInformationCircleOutline,
            information:''
        },
        {
            icon:FaCircleCheck,
            label:'3 months validity',
            informationicon:IoIosInformationCircleOutline,
            information:'Use this plan within 3 months of purchase'
        },
        
    ]
  return (
    <>
    <div className='flex justify-center my-10'>
        <Modal open={isModelOpen} onCancel={() => setIsModelOpen(false)} footer={null}>
        <h3>Proceed to purchase</h3>
    </Modal>

        <div className='max-w-lg p-6 bg-white border border-blue-200 shadow-lg'>
            <img src="https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/planpack.png" alt="..." />
            <h3>Sachet Pack</h3>
            <p><span className='text-xs text-gray-500'>Get Premium pack for posting muliple properties and sell faster.</span></p>
            <p className='mt-5'><span className='text-sm'>{numberOfListingPack} Listing Pack</span></p>
            <p className='flex'><LuIndianRupee className='mt-1 me-1' /><span><span className='font-bold'>{parseInt(priceIncGST).toLocaleString('en-In')} </span><span className='text-xs text-gray-500'>incl.GST</span></span></p>
            <button className='w-full bg-blue-500 p-2 rounded-lg my-2 text-white font-medium cursor-pointer' onClick={showDrawer}>Buy Sachet Pack</button>
            <Drawer 
            title='Card'
            closable
            maskClosable={false}
            keyboard={false}
            width={500}
            onClose={onClose}
            open={open}
            footer={
                <div>
                <button onClick={showModel} className='w-full bg-blue-500 p-2 rounded-lg my-2 text-white font-medium cursor-pointer'>Proceed To Purchase</button>
                </div>
            }
            styles={{
                body:{backgroundColor: '#efebeb',padding:0}
                
            }}
            >
                <div className="shadow-lg bg-white p-6 rounded">
                <p><span className='text-lg font-medium'>25 Premium Listing Combo-Common Pack - Dealer - plan Options</span></p>
                <div className="shadow-lg max-w-[15vw] p-2 bg-blue-50 border border-blue-300 rounded-md">
                    <div className="flex justify-between">
                        <p><span className='text-sm font-medium text-gray-500'>{numberOfListingPack} Listing</span></p>
                        <div class="flex items-center">
                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                    </div>
                    <div className='my-5'>
                        <p className='flex'><LuIndianRupee className='mt-1' /><span><span className='font-bold'>{parseInt(priceIncGST).toLocaleString('en-In')} /- </span><span className='text-xs text-gray-500'>incl.GST</span></span></p>
                        <p><span className='flex text-xs  text-gray-900 font-base'><LuIndianRupee className='mt-1' /><span>{parseInt(priceIncGST/numberOfListingPack)} / listing</span><span></span></span></p>
                    </div>
                </div>

                {/* still con */}
                <p className="my-2"><span className='font-normal text-sm'>Still confused?</span> <span className='text-xs font-medium text-gray-500 cursor-pointer' >Get assistance</span></p>
                </div>
                <div className='p-6'>
                <p><span className="font-normal">Payment Summary</span></p>
                <div className='shadow-sm bg-[#efebeb] rounded-lg p-3'>
                    <div className="flex justify-between">
                        <p><span className="font-normal text-xs text-gray-500">25 Premium Listing Combo - Common Pack -Dealer</span></p>
                        <p ><span className='flex text-xs text-gray-500 mt-2'><LuIndianRupee className='mt-1' />{parseInt(price).toLocaleString('en-In')}</span></p>
                    </div>
                    <div className="flex justify-between">
                         <p><span className="font-normal text-xs text-gray-500">GST <span className='text-gray-700'>Add GSTIN</span> (optional)</span></p>
                        <p><span className='flex text-xs text-gray-500 mt-2'><LuIndianRupee className='mt-1' />{parseInt(GST).toLocaleString('en-In')}</span></p>
                    </div>
                    <div className="flex justify-between">
                         <p><span className="font-bold text-sm text-gray-700">Total</span></p>
                        <p><span className='flex text-sm text-gray-700 font-bold mt-2'><LuIndianRupee className='mt-1' />{parseInt(priceIncGST).toLocaleString('en-In')}</span></p>
                    </div>
                </div>

                
                </div>
            </Drawer>
            <div>
                {features.map((item,index) => {
                    return(
                        <div className='flex justify-between my-2' key={index}>
                            <div className='flex'>
                            <item.icon className='text-blue-200 m-2 '/>
                            <p><span className='text-xs'>{item.label}</span></p>
                            </div>
                            <item.informationicon className='text-gray-500 mt-1' />
                        </div>
                    )
                })}
            </div>
      </div>
      <div className='max-w-lg p-20 h-[28vw] my-10 bg-orange-100 relative  shadow-lg rounded-e-4xl'>
        <p><span className='font-medium text-gray-500'>DEALER PLANS</span></p>
        <h3><span className='text-4xl'>Pick a Plan to Sell properties faster</span></h3>
        <img src="https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/searchPackes.png" alt="..." className='absolute object-cover right-20 w-100' />
      </div>

        
    </div>
        <div className='flex justify-center my-10'>
            <div className='text-center'>
            <h1>New Plans to Contact Owners</h1>
            <p><span className='font-bold text-gray-500 text-center'>to close deals faster and grow business</span></p>
            <div className="shadow-lg my-10 bg-blue-50 p-6">
                <div className="flex justify-center">
                    <img src="" alt="" />
                    <button className="bg-blue-500 text-white font-medium p-2 rounded">
                        View Plans
                    </button>
                </div>
            </div>

            <div>
                <h2><span>Other Services for Dealers</span></h2>
                <p><span className='text-gray-400 font-bold'>with our curated plans for you</span></p>
                <div className="flex">
                    <div className="shadow-lg max-w-xl m-5 p-5 text-start rounded-xl bg-orange-100 border border-orange-300">
                        <div className="flex justify-evenly">
                            <div>
                        <h3><span>Banners</span></h3>
                        <p><span className='text-xs font-medium'>Get your brand noticed by property buyers by property buyers by securing brand space on India's top real estate website</span></p>
                        <a href="" className='flex text-blue-500 my-2'><span className='text-sm mt-1'>Know More </span><WiDirectionRight className='text-3xl' /></a>
                            </div>
                            <img src="https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/baner_Ok.png" className='w-50 h-40' alt="" />
                        </div>
                    </div>
                    <div className="shadow-lg m-5 p-5 bg-blue-100 max-w-xl border border-blue-300 rounded-xl text-start">
                        <div className="flex justify-evenly">
                            <div>
                        <h3><span>Featured Listing</span></h3>
                        <p><span className="text-xs font-medium">Provides guaranteed prominence and exposure in preferred locality</span></p>
                        <a href="" className='flex text-blue-500 my-5'><span className='text-sm mt-1'>Know More </span><WiDirectionRight className='text-3xl' /></a>
                            </div>
                            <img src="https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/blurDF.png" className='w-50 h-40' alt="" />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="shadow-lg max-w-xl m-5 p-5 text-start rounded-xl bg-orange-100 border border-orange-300">
                        <div className="flex justify-evenly">
                            <div>
                        <h3><span>Featured Project</span></h3>
                        <p><span className='text-xs font-medium'>Recommended product for getting new booking buyer leads for the primary clients</span></p>
                        <a href="" className='flex text-blue-500 my-2'><span className='text-sm mt-1'>Know More </span><WiDirectionRight className='text-3xl' /></a>
                            </div>
                            <img src="https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/featured.png" className='w-50 h-40' alt="" />
                        </div>
                    </div>
                    <div className="shadow-lg m-5 p-5 bg-blue-100 max-w-xl border border-blue-300 rounded-xl text-start">
                        <div className="flex justify-evenly">
                            <div>
                        <h3><span>Premium Plan</span></h3>
                        <p><span className="text-xs font-medium">Let your property stand out from the crowd with larger display on search results and added animation to attract</span></p>
                        <a href="" className='flex text-blue-500 my-5'><span className='text-sm mt-1'>Know More </span><WiDirectionRight className='text-3xl' /></a>
                            </div>
                            <img src="https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/premiumPlan.png" className='w-50 h-40' alt="" />
                        </div>
                    </div>
                </div>
            </div>

             {/* why up */}
            <div className="shadow-lg my-10 pb-24 w-[80vw] mx-auto rounded-lg bg-orange-100 relative">
                <div className='mx-auto my-10'>
                    <p><span className="text-gray-400 text-xs font-bold">
                        WHY UPGRADE MY POSTING?    
                    </span></p>
                    <h2 className='w-100 mx-auto'><span>Benefits of upgrading your posting on Indiadealss</span></h2>
                </div>

                <div className='mx-auto  absolute object-cover right-40'>
                    <div className="flex">
                        <div className='shadow-lg p-2 max-w-md text-start rounded-lg bg-white mx-2'>
                            <span className=''><img src="https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/apperHigher.png" className='w-10 h-10' alt="" /></span>
                            <p><span className='text-blue-400 font-bold'>01.</span> <span className='font-bold'>Appear higher in searches</span></p>
                            <p><span>Upgraded postings apper higher in search results giving your posting more views and responses.</span></p>
                        </div>
                        <div className='shadow-lg p-2 max-w-md text-start rounded-lg bg-white bg-white mx-2'>
                             <span className=''><img src="https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/hassel.png" className='w-10 h-10' alt="" /></span>
                            <p><span className='text-blue-400 font-bold'>02.</span> <span className='font-bold'>Hassle free selling/renting</span></p>
                            <p><span>Upgraded postings apper higher in search results giving your posting more views and responses.</span></p>
                        </div>
                    </div>
                        
                </div>
            </div>

            <div className='text-start ms-20  my-10 pt-10'>
                <a className='flex'><span>View dealer plans to sell house faster</span> <WiDirectionRight className='text-4xl' /></a>
            </div>
            </div>
        </div>
    </>
  )
}

export default Buyservice;

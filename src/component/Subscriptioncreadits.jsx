import React, { useState } from 'react'

const Subscriptioncreadits = () => {
    const [active , setActive] = useState('None');

    const subBtn = [
    {
        name:'Expiring Soon',
        label:'Expiring Soon'
    },
    {
        name:'Most Credits',
        label:'Most Credits'
    },{
        name:'Least Credits',
        label:'Least Credits'
    },{
        name:'Recently Bought',
        label:'Recently Bought'
    },{
        name:'None',
        label:'None'
    },
    ]
  return (
    <div>
    <div className='my-3'>
      <h1>Croose a Subscription</h1>
      <p className='my-3'>You have the following existing plans. Pick the plan you would like to post this property</p>
        <div className="flex">
            <div>
                <span>Sort By:</span>
            </div>
            <div className='flex'>
                {subBtn.map((item,index) => {
                    return(
                        <div className='' key={index}>
                            <button className={`${active === item.name ? 'bg-gray-100 rounded-full mx-5 px-2 text-sm font-medium text-gray-500 py-1': 'border border-gray-400 rounded-full cursor-pointer mx-5 px-2 text-sm'}`} onClick={() => setActive(item.name)} type='button'>
                                {item.label}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
        <div className='flex mt-5'>
            <div className='border border-gray-300 rounded'>
                <div className='flex'>
                <input type='radio' id='defalut' className='rounded-full ms-6' />
                <div className='px-20 border-e border-gray-300'>
                    <p><span className='font-medium text-gray-600'>40.46 Infinity Listings</span></p>
                    <p><span className='font-normal text-gray-600'>Applicable <span className='font-medium text-gray-600'>NCR-ALL</span></span></p>
                    <p><span>Expire on Jan 10,2026</span></p>
                </div>
                <div className='px-5 my-auto'>
                    <p><span>15459</span></p>
                    <p><span>Credits</span></p>
                </div>
                </div>
            </div>
            
        </div>
        </div>
  )
}

export default Subscriptioncreadits

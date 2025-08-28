import React, { useState } from 'react'

export const Anenimies = () => {

    
    const [otherRooms,setOtherRooms] = useState('');
    const [furnishing,setFurnishing] = useState('');


   const pricingDetails = [
    {name:'All inclusive Price',label:'All inclusive Price'},
    {name:'Tax and Govt. Charges excluded',label:'Tax and Govt. Charges excluded'},
    {name:'Price Negotiable',label:'Price Negotiable'}
  ]
    const OtherRoom = [
        {
            name:'Pooja Room',
            label:'Pooja Room'
        },
        {
            name:'Study Room',
            label:'Study Room'
        },
        {
            name:'Servent Room',
            label:'Servent Room'
        },
        {
            name:'Store Room',
            label:'Store Room'
        }
    ]

    const Furnishing = [
        {
            name:'Furnished',
            label:'Furnished'
        },
        {
            name:'Semi-furnished',
            label:'Semi-furnished'
        },
        {
            name:'Un-furnished',
            label:'Un-furnished'
        }
    ]
  return (
    <>
        <h3 className='text-xl font-medium my-2'>Add amenities/unique features</h3>
        <p className='text-sm text-gray-400 font-normal'>These fields are used to populate USP & captions<br />All fields on this page are optional</p>
        <h3 className='text-xl font-medium my-5'>Other rooms<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap '>
            {OtherRoom.map((item,index) => {
                return(
                    <button key={index} name={item.name} 
                    className={`${otherRooms === item.name ? " mx-2 my-1 p-2 rounded-full cursor-pointer bg-gray-100 text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={(e) => setOtherRooms(e.currentTarget.name)}
          >
                        {item.label}
                        </button>
                )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Furnishing <span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap '>
            {Furnishing.map((item,index) => {
                return(
                    <button key={index} 
                    name={item.name}
                    className={`${furnishing === item.name ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={(e) => setFurnishing(e.currentTarget.name)}
          >
                        {item.label}
                        </button>
                )
            })}
        </div>
        <p className='font-medium text-lg'>Price Details</p>
      <div className='flex '>
        <input type='number' className='mx-2 my-1 outline-none border border-1 border-gray-200 my-4 px-4 py-2 w-40' placeholder='Expected Price' />
        <input type='text' disabled className='mx-2 my-1 outline-none border border-1 border-gray-200 my-4 px-4 py-2 w-30 text-xs' placeholder='Price per sq.ft' />
        </div>
        <div className='flex flex-wrap my-5'>
          {pricingDetails.map((item,index) =>{
            return(
              <div className='flex mb-4 item-center flex-wrap mx-2 my-1'>
                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm outline-none" />
    <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.label}</label>
              </div>
            )
          })}
        </div>
        
    </>
  )
}
